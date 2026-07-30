import { supabase } from './_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. GET: Fetch all lessons list
  if (req.method === 'GET') {
    try {
      const { data: lessons, error } = await supabase
        .from('lessons')
        .select('slug, title, status, type, slide_count')
        .order('slug', { ascending: true });

      if (error) {
        console.error('Supabase error fetching lessons:', error);
        return res.status(500).json({ error: error.message });
      }

      const formatted = lessons.map(l => ({
        slug: l.slug,
        title: l.title,
        hasPlan: l.status === 'plan_only' || l.status === 'written' || l.status === 'sliced',
        hasFinal: l.status === 'written' || l.status === 'sliced',
        status: l.status,
        slideCount: l.slide_count,
        type: l.type
      }));

      return res.status(200).json(formatted);
    } catch (err) {
      console.error('Serverless error in GET /api/lessons:', err);
      return res.status(500).json({ error: err.message });
    }
  }

  // 2. POST: Create a brand new lesson
  if (req.method === 'POST') {
    const { slug, title } = req.body || {};
    if (!slug) {
      return res.status(400).json({ error: 'Slug parameter is required' });
    }

    try {
      const cleanSlug = slug.toLowerCase();
      const newLesson = {
        slug: cleanSlug,
        title: title || cleanSlug.toUpperCase(),
        status: 'no_plan',
        type: 'theorique',
        slide_count: 0,
        plan: `# Leçon ${title || cleanSlug.toUpperCase()}\n\nNouveau plan de cours...`,
        final: null,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('lessons')
        .upsert(newLesson)
        .select()
        .single();

      if (error) {
        console.error('Supabase error creating lesson:', error);
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ success: true, lesson: data });
    } catch (err) {
      console.error('Serverless error in POST /api/lessons:', err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
