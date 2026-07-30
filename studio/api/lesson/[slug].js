import { supabase } from '../_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { slug } = req.query;
  const cleanSlug = Array.isArray(slug) ? slug[0] : slug;

  if (!cleanSlug) {
    return res.status(400).json({ error: 'Slug parameter is required' });
  }

  try {
    const { data: lesson, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('slug', cleanSlug.toLowerCase())
      .single();

    if (error || !lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    return res.status(200).json({
      slug: lesson.slug,
      title: lesson.title,
      plan: lesson.plan,
      final: lesson.final
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
