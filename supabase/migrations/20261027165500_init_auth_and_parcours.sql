-- ============================================================================
-- Migration : Authentification Wemodo (Whitelist) & Persistance Parcours (RLS)
-- Projet    : vibecoding-wemodo (mpjdrzetaujjuwdjddgt)
-- ============================================================================

-- 1. Table des emails autorisés (Apprenants Wemodo)
CREATE TABLE IF NOT EXISTS public.allowed_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  learner_name text,
  cohort text DEFAULT 'Standard 2026',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT allowed_emails_lowercase_chk CHECK (email = lower(btrim(email)))
);

ALTER TABLE public.allowed_emails ENABLE ROW LEVEL SECURITY;

-- Un utilisateur connecté peut uniquement voir sa propre entrée dans allowed_emails
DROP POLICY IF EXISTS "Users can view their own allowed email entry" ON public.allowed_emails;
CREATE POLICY "Users can view their own allowed email entry"
  ON public.allowed_emails
  FOR SELECT
  TO authenticated
  USING (lower(email) = lower(auth.jwt() ->> 'email'));

-- Fonction RPC sécurisée (SECURITY DEFINER) pour vérifier si un email est autorisé
-- sans jamais exposer la liste des emails aux visiteurs non connectés
CREATE OR REPLACE FUNCTION public.is_email_allowed(candidate_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF candidate_email IS NULL OR btrim(candidate_email) = '' THEN
    RETURN false;
  END IF;

  RETURN EXISTS (
    SELECT 1
    FROM public.allowed_emails
    WHERE lower(btrim(email)) = lower(btrim(candidate_email))
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.is_email_allowed(text) TO anon, authenticated;

-- Trigger BEFORE INSERT sur auth.users pour bloquer côté serveur toute inscription
-- d'un email qui ne figure pas dans public.allowed_emails
CREATE OR REPLACE FUNCTION public.enforce_allowed_email_on_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_email_allowed(NEW.email) THEN
    RAISE EXCEPTION 'Accès réservé aux apprenants Wemodo : cette adresse email (%) n''est pas autorisée.', NEW.email
      USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_enforce_allowed_email ON auth.users;
CREATE TRIGGER trg_enforce_allowed_email
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_allowed_email_on_signup();


-- 2. Table des profils utilisateurs (Socle extensible pour privatiser d'autres données)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  display_name text,
  active_session_index integer NOT NULL DEFAULT 0,
  parcours_view_mode text NOT NULL DEFAULT 'focus' CHECK (parcours_view_mode IN ('focus', 'grid')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Trigger de création automatique du profil à la création d'un utilisateur Auth
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_name text;
BEGIN
  SELECT learner_name INTO v_name
  FROM public.allowed_emails
  WHERE lower(btrim(email)) = lower(btrim(NEW.email))
  LIMIT 1;

  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    lower(btrim(NEW.email)),
    COALESCE(v_name, split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_on_auth_user_created ON auth.users;
CREATE TRIGGER trg_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_auth_user();


-- 3. Table de persistance des devoirs réalisés dans le panneau Parcours
CREATE TABLE IF NOT EXISTS public.parcours_homework_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  homework_id text NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT parcours_homework_progress_user_hw_unique UNIQUE (user_id, homework_id)
);

CREATE INDEX IF NOT EXISTS idx_parcours_homework_progress_user_id
  ON public.parcours_homework_progress(user_id);

ALTER TABLE public.parcours_homework_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can select own homework progress" ON public.parcours_homework_progress;
CREATE POLICY "Users can select own homework progress"
  ON public.parcours_homework_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own homework progress" ON public.parcours_homework_progress;
CREATE POLICY "Users can insert own homework progress"
  ON public.parcours_homework_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own homework progress" ON public.parcours_homework_progress;
CREATE POLICY "Users can update own homework progress"
  ON public.parcours_homework_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own homework progress" ON public.parcours_homework_progress;
CREATE POLICY "Users can delete own homework progress"
  ON public.parcours_homework_progress
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);


-- 4. Pré-remplissage initial de allowed_emails pour le compte administrateur/test
INSERT INTO public.allowed_emails (email, learner_name, cohort)
VALUES ('maxime@elhaik.com', 'Maxime Elhaik', 'Admin / Wemodo')
ON CONFLICT (email) DO NOTHING;
