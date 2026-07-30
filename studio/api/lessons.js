import { supabase } from './_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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
    console.error('Serverless error in /api/lessons:', err);
    return res.status(500).json({ error: err.message });
  }
}
