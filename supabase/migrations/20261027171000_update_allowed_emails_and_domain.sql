-- ============================================================================
-- Migration : Mise à jour des règles d'emails autorisés (Whitelist + Domaine Wemodo)
-- ============================================================================

-- 1. Insertion des emails spécifiques
INSERT INTO public.allowed_emails (email, learner_name, cohort)
VALUES 
  ('maxelhaik@gmail.com', 'Maxime Elhaik', 'Admin / Wemodo'),
  ('maxime.elhaik@gmail.com', 'Maxime Elhaik', 'Admin / Wemodo'),
  ('maxime@elhaik.com', 'Maxime Elhaik', 'Admin / Wemodo')
ON CONFLICT (email) DO NOTHING;

-- 2. Mise à jour de la fonction RPC de vérification pour inclure tous les emails *@wemodo.com
CREATE OR REPLACE FUNCTION public.is_email_allowed(candidate_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  clean_email text;
BEGIN
  IF candidate_email IS NULL OR btrim(candidate_email) = '' THEN
    RETURN false;
  END IF;

  clean_email := lower(btrim(candidate_email));

  -- 1. Autoriser tous les emails du domaine officiel @wemodo.com
  IF clean_email LIKE '%@wemodo.com' THEN
    RETURN true;
  END IF;

  -- 2. Autoriser les emails individuels enregistrés dans la table allowed_emails
  RETURN EXISTS (
    SELECT 1
    FROM public.allowed_emails
    WHERE lower(btrim(email)) = clean_email
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.is_email_allowed(text) TO anon, authenticated;
