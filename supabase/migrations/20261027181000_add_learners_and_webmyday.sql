-- ============================================================================
-- Migration : Ajout des apprenants et du domaine @webmyday.io
-- ============================================================================

-- 1. Insertion des nouveaux emails apprenants
INSERT INTO public.allowed_emails (email, learner_name, cohort)
VALUES 
  ('flavien@flowbris.fr', 'Flavien Satiat', 'Promo Vibe Coding'),
  ('riccardo@amarsi.fr', 'Riccardo Liopi', 'Promo Vibe Coding'),
  ('maximeboutot@hotmail.com', 'Maxime Boutot', 'Promo Vibe Coding'),
  ('rajaa.amine@up.coop', 'Rajaa Amine', 'Promo Vibe Coding'),
  ('frederic.buisset@gmail.com', 'Frédéric Buisset', 'Promo Vibe Coding'),
  ('sylvain.lepoivre@gmail.com', 'Sylvain Lepoivre', 'Promo Vibe Coding'),
  ('johanna@webmyday.io', 'Johanna Perianayagom', 'Promo Vibe Coding / WMD')
ON CONFLICT (email) DO UPDATE
  SET learner_name = EXCLUDED.learner_name;

-- 2. Mise à jour de la fonction de vérification pour inclure *@wemodo.com et *@webmyday.io
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

  -- 1. Autoriser tous les emails des domaines officiels @wemodo.com et @webmyday.io
  IF clean_email LIKE '%@wemodo.com' OR clean_email LIKE '%@webmyday.io' THEN
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
