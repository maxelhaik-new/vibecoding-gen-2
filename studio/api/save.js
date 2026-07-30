import { supabase } from './_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slug, final, plan } = req.body;
  if (!slug) {
    return res.status(400).json({ error: 'Slug is required' });
  }

  try {
    const cleanSlug = slug.toLowerCase();
    const updateData = { updated_at: new Date().toISOString() };

    if (final !== undefined) {
      updateData.final = final;
      if (final && Array.isArray(final.slides)) {
        updateData.slide_count = final.slides.length;
        updateData.status = final.slides.length <= 1 ? 'sliced' : 'written';
      }
      if (final.lessonTitle) {
        updateData.title = final.lessonTitle;
      }
    }

    if (plan !== undefined) {
      updateData.plan = plan;
      if (!updateData.status && plan) {
        updateData.status = 'plan_only';
      }
    }

    const { data, error } = await supabase
      .from('lessons')
      .upsert({ slug: cleanSlug, ...updateData })
      .select()
      .single();

    if (error) {
      console.error('Supabase save error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, lesson: data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
