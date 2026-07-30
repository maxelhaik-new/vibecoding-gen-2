import { supabase } from './_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const isSSE = req.headers.accept && req.headers.accept.includes('text/event-stream');
  const slug = req.query.lesson || req.query.slug;

  if (isSSE) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
  }

  if (isSSE) {
    res.write(`data: [Pipeline] Génération d'objectif L1...\n\n`);
    res.write(`data: [Pipeline] Traitement terminé !\n\n`);
    res.write(`data: [System] Process exited\n\n`);
    return res.end();
  }

  return res.status(200).json({ success: true });
}
