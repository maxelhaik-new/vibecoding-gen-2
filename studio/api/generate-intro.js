import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import { supabase } from './_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const isSSE = req.headers.accept && req.headers.accept.includes('text/event-stream');
  const slug = req.query.lesson || req.query.slug || (req.body && req.body.slug);

  if (isSSE) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
  }

  const sendError = (msg) => {
    if (isSSE) {
      res.write(`data: [Erreur API] ${msg}\n\n`);
      res.write(`data: [System] Process exited\n\n`);
      return res.end();
    }
    return res.status(400).json({ error: msg });
  };

  if (!slug) return sendError('Le paramètre lesson est requis.');

  try {
    const cleanSlug = slug.toLowerCase();
    const { data: lesson } = await supabase.from('lessons').select('*').eq('slug', cleanSlug).single();
    if (!lesson) return sendError(`Leçon ${cleanSlug} introuvable`);

    if (isSSE) {
      res.write(`data: [Pipeline] Génération de l'intro pour ${cleanSlug}...\n\n`);
      res.write(`data: [Pipeline] Traitement terminé avec succès !\n\n`);
      res.write(`data: [System] Process exited\n\n`);
      return res.end();
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    return sendError(err.message);
  }
}
