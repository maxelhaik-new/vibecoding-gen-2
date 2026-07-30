import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import { supabase } from './_supabase.js';
import { getReferenceRules } from './_rules.js';

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

  const { slug, phase } = req.body || {};
  if (!slug || !phase) {
    return res.status(400).json({ error: 'Slug et phase sont requis (ex: phase: "decoupe" ou "ecris")' });
  }

  try {
    const cleanSlug = slug.toLowerCase();
    const { data: lesson, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('slug', cleanSlug)
      .single();

    if (error || !lesson) {
      return res.status(404).json({ error: 'Leçon introuvable' });
    }

    if (!lesson.plan) {
      return res.status(400).json({ error: 'La leçon n\'a pas encore de plan MD sur lequel effectuer la découpe ou rédaction.' });
    }

    // Load strict reference rules dynamically from files
    const referenceRules = getReferenceRules();

    const systemPrompt = `Tu es l'expert Vibe Slicer. Tu prends un plan de cours Markdown et tu génères un objet JSON valide de slides de cours selon les règles pédagogiques et techniques ci-dessous.

${referenceRules}

INSTRUCTION DE STRUCTURE :
Le JSON doit impérativement respecter la structure exacte ci-dessous :
{
  "lessonTitle": "${lesson.title}",
  "lessonType": "${lesson.type}",
  "slides": [
    {
      "template": "NOM_DU_TEMPLATE_VALIDE",
      "content": { ... }
    }
  ]
}
Renvoie UNIQUEMENT le JSON valide sans explications ni balises markdown.`;

    let generatedJsonText = '';

    if (process.env.GEMINI_API_KEY) {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemPrompt}\n\nVoici le plan Markdown de la leçon :\n${lesson.plan}`,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      });
      generatedJsonText = response.text;
    } else if (process.env.OPENAI_API_KEY) {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Voici le plan Markdown de la leçon :\n${lesson.plan}` }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.2
      });
      generatedJsonText = completion.choices[0].message.content;
    } else {
      return res.status(400).json({
        error: 'Aucune clé d\'API IA (GEMINI_API_KEY ou OPENAI_API_KEY) configurée dans Vercel.'
      });
    }

    const parsedFinal = JSON.parse(generatedJsonText);
    const slideCount = parsedFinal.slides ? parsedFinal.slides.length : 0;
    const newStatus = slideCount <= 1 ? 'sliced' : 'written';

    // Update Supabase
    const { data: updated, error: updateErr } = await supabase
      .from('lessons')
      .update({
        final: parsedFinal,
        slide_count: slideCount,
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('slug', cleanSlug)
      .select()
      .single();

    if (updateErr) {
      return res.status(500).json({ error: updateErr.message });
    }

    return res.status(200).json({
      success: true,
      phase,
      lesson: updated
    });

  } catch (err) {
    console.error('Error in pipeline execution:', err);
    return res.status(500).json({ error: err.message });
  }
}
