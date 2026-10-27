// Supabase Client & Data Service — Projet vibecoding-wemodo (mpjdrzetaujjuwdjddgt)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

export const SUPABASE_URL = 'https://mpjdrzetaujjuwdjddgt.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wamRyemV0YXVqanV3ZGpkZGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxMTAyOTYsImV4cCI6MjEwODY4NjI5Nn0.xxTsZW6WD59rEMxIiOI2s97XjMvUSZgMB0hcPJBx_hI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

/**
 * Vérifie via RPC si l'adresse email est autorisée (table allowed_emails ou domaine @wemodo.com).
 */
export async function checkEmailAllowed(email) {
  const cleanEmail = String(email || '').trim().toLowerCase();
  if (!cleanEmail) return false;

  const { data, error } = await supabase.rpc('is_email_allowed', {
    candidate_email: cleanEmail
  });

  if (error) {
    console.error('[Supabase] Erreur vérification email:', error);
    throw new Error("Impossible de vérifier l'adresse email pour le moment.");
  }

  return Boolean(data);
}

/**
 * Connexion par Email + Mot de passe
 */
export async function signInWithPassword(email, password) {
  const cleanEmail = String(email || '').trim().toLowerCase();
  const isAllowed = await checkEmailAllowed(cleanEmail);

  if (!isAllowed) {
    throw new Error("Cette adresse email ne figure pas parmi les apprenants Wemodo autorisés.");
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: cleanEmail,
    password
  });

  if (error) {
    throw new Error(translateAuthError(error.message));
  }

  return data;
}

/**
 * Création de compte / mot de passe apprenant
 */
export async function signUpWithPassword(email, password) {
  const cleanEmail = String(email || '').trim().toLowerCase();
  const isAllowed = await checkEmailAllowed(cleanEmail);

  if (!isAllowed) {
    throw new Error("Cette adresse email ne figure pas parmi les apprenants Wemodo autorisés.");
  }

  const { data, error } = await supabase.auth.signUp({
    email: cleanEmail,
    password
  });

  if (error) {
    throw new Error(translateAuthError(error.message));
  }

  return data;
}

/**
 * Déconnexion de la session courante
 */
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Charge les devoirs validés et les préférences de parcours depuis Supabase
 */
export async function fetchUserParcoursState(userId) {
  if (!userId) {
    return {
      completedTasks: new Set(),
      activeSessionIndex: 0,
      viewMode: 'focus'
    };
  }

  const [hwResult, profileResult] = await Promise.all([
    supabase
      .from('parcours_homework_progress')
      .select('homework_id, session_id')
      .eq('user_id', userId),
    supabase
      .from('profiles')
      .select('active_session_index, parcours_view_mode, display_name')
      .eq('id', userId)
      .maybeSingle()
  ]);

  if (hwResult.error) {
    console.error('[Supabase] Erreur chargement devoirs:', hwResult.error);
  }

  const completedTasks = new Set(
    (hwResult.data || []).map(row => row.homework_id)
  );

  const activeSessionIndex = typeof profileResult.data?.active_session_index === 'number'
    ? profileResult.data.active_session_index
    : 0;

  const viewMode = profileResult.data?.parcours_view_mode === 'grid' ? 'grid' : 'focus';

  return {
    completedTasks,
    activeSessionIndex,
    viewMode
  };
}

/**
 * Coche ou décoche un devoir dans Supabase (RLS : user_id = auth.uid())
 */
export async function setHomeworkTaskStatus(userId, sessionId, homeworkId, isCompleted) {
  if (!userId || !homeworkId) return;

  if (isCompleted) {
    const { error } = await supabase
      .from('parcours_homework_progress')
      .upsert(
        {
          user_id: userId,
          session_id: sessionId,
          homework_id: homeworkId,
          completed_at: new Date().toISOString()
        },
        { onConflict: 'user_id,homework_id' }
      );
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('parcours_homework_progress')
      .delete()
      .eq('user_id', userId)
      .eq('homework_id', homeworkId);
    if (error) throw error;
  }
}

/**
 * Coche tous les devoirs d'une séance
 */
export async function completeAllSessionTasks(userId, sessionId, homeworkIds = []) {
  if (!userId || !homeworkIds.length) return;

  const rows = homeworkIds.map(hwId => ({
    user_id: userId,
    session_id: sessionId,
    homework_id: hwId,
    completed_at: new Date().toISOString()
  }));

  const { error } = await supabase
    .from('parcours_homework_progress')
    .upsert(rows, { onConflict: 'user_id,homework_id' });

  if (error) throw error;
}

/**
 * Réinitialise tous les devoirs de l'utilisateur connecté dans Supabase
 */
export async function resetAllUserHomework(userId) {
  if (!userId) return;

  const { error } = await supabase
    .from('parcours_homework_progress')
    .delete()
    .eq('user_id', userId);

  if (error) throw error;
}

/**
 * Sauvegarde la séance active ou le mode de vue dans le profil utilisateur Supabase
 */
export async function updateUserParcoursPrefs(userId, email, updates = {}) {
  if (!userId) return;

  const payload = {
    id: userId,
    email: String(email || '').toLowerCase(),
    updated_at: new Date().toISOString(),
    ...updates
  };

  const { error } = await supabase
    .from('profiles')
    .upsert(payload, { onConflict: 'id' });

  if (error) {
    console.warn('[Supabase] Non-bloquant : mise à jour préférences profil:', error.message);
  }
}

function translateAuthError(msg = '') {
  const m = msg.toLowerCase();
  if (m.includes('invalid login credentials')) {
    return 'Adresse email ou mot de passe incorrect.';
  }
  if (m.includes('user already registered')) {
    return 'Ce compte existe déjà. Utilisez l’onglet « Se connecter ».';
  }
  if (m.includes('password should be at least')) {
    return 'Le mot de passe doit comporter au moins 6 caractères.';
  }
  if (m.includes('rate limit') || m.includes('security purposes')) {
    return 'Trop de tentatives rapprochées. Veuillez patienter un instant.';
  }
  if (m.includes('n\'est pas autorisée') || m.includes('not allowed')) {
    return "Cette adresse email ne figure pas parmi les apprenants Wemodo autorisés.";
  }
  return msg || 'Une erreur est survenue lors de la connexion.';
}
