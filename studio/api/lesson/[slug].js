import { supabase } from '../_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { slug } = req.query;
  const cleanSlug = Array.isArray(slug) ? slug[0] : slug;

  if (!cleanSlug) {
    return res.status(400).json({ error: 'Slug parameter is required' });
  }

  // 1. GET Request: Read Lesson
  if (req.method === 'GET') {
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

  // 2. POST Request: Save or Update Lesson / Delete Slide
  if (req.method === 'POST') {
    const { final, plan } = req.body || {};
    try {
      const updateData = { updated_at: new Date().toISOString() };

      if (final !== undefined) {
        updateData.final = final;
        if (final && Array.isArray(final.slides)) {
          updateData.slide_count = final.slides.length;
          updateData.status = final.slides.length <= 1 ? 'sliced' : 'written';
        }
        if (final && final.lessonTitle) {
          updateData.title = final.lessonTitle;
        }
      }

      if (plan !== undefined) {
        updateData.plan = plan;
      }

      const { data, error } = await supabase
        .from('lessons')
        .upsert({ slug: cleanSlug.toLowerCase(), ...updateData })
        .select()
        .single();

      if (error) {
        console.error('Supabase error saving lesson:', error);
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ success: true, lesson: data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
