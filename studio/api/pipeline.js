import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import { supabase } from './_supabase.js';
import { getStaticReferenceRules, getExtractedTemplates } from './_rules.js';

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

  const { slug, phase = 'decoupe' } = req.body || {};
  if (!slug) {
    return res.status(400).json({ error: 'Le paramètre slug est requis (ex: slug: "m4c5l3")' });
  }

  try {
    const cleanSlug = slug.toLowerCase();
    const { data: lesson, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('slug', cleanSlug)
      .single();

    if (error || !lesson) {
      return res.status(404).json({ error: 'Leçon introuvable dans Supabase' });
    }

    if (!lesson.plan) {
      return res.status(400).json({ error: 'La leçon n\'a pas encore de plan MD sur lequel effectuer la découpe ou rédaction.' });
    }

    let templatesContext = '';
    if (phase === 'decoupe') {
      const summaryTemplates = getExtractedTemplates(null);
      templatesContext = `CATALOGUE DES TEMPLATES VALIDES VIBECODING :\n${JSON.stringify(summaryTemplates, null, 2)}`;
    } else {
      let neededNames = ['VIBECODING - COVER', 'VIBECODING - INTRO', 'VIBECODING - PROCESS', 'VIBECODING - FIN'];
      if (lesson.final && Array.isArray(lesson.final.slides)) {
        neededNames = [...new Set([...neededNames, ...lesson.final.slides.map(s => s.template)])];
      }
      const targetedTemplates = getExtractedTemplates(neededNames);
      templatesContext = `CONTRAINTES STRICTES DES TEMPLATES SÉLECTIONNÉS :\n${JSON.stringify(targetedTemplates, null, 2)}`;
    }

    const staticRules = getStaticReferenceRules();

    let phaseInstruction = '';
    if (phase === 'decoupe') {
      phaseInstruction = `OBJECTIF DE LA PHASE DECOUPE :
Analyse le plan Markdown et génère une séquence de 5 à 9 slides.
Chaque slide doit impérativement comporter :
- "title" : le titre explicite du sujet traité par la slide
- "template" : le nom exact d'un template valide parmi le catalogue ci-dessus
- "content" : un objet contenant au minimum la clé {"Titre": "..."}`;
    } else {
      phaseInstruction = `OBJECTIF DE LA PHASE ECRIS (RÉDACTION COMPLÈTE) :
Rédige intégralement l'ensemble des slides du cours (6 à 10 slides).
Respecte les limites min/max de caractères fournies pour chaque champ.
Chaque slide doit avoir un "title", un "template" valide et son dictionnaire "content" complet.
La dernière slide doit obligatoirement être le template "VIBECODING - FIN".`;
    }

    const systemPrompt = `Tu es l'expert Vibe Slicer.

${staticRules}

${templatesContext}

${phaseInstruction}

INSTRUCTION STRICTE DE FORMAT JSON :
{
  "lessonTitle": "${lesson.title}",
  "lessonType": "${lesson.type}",
  "slides": [
    {
      "title": "Titre explicite de la slide",
      "template": "NOM_EXACT_DU_TEMPLATE_OFFICIEL",
      "content": {
        "Titre": "..."
      }
    }
  ]
}
Renvoie EXCLUSIVEMENT le JSON valide brut.`;

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
      return res.status(400).json({ error: 'Aucune clé d\'API IA configurée dans Vercel.' });
    }

    let cleanJson = generatedJsonText.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const parsedFinal = JSON.parse(cleanJson);

    if (parsedFinal.slides && Array.isArray(parsedFinal.slides)) {
      parsedFinal.slides = parsedFinal.slides.map(s => ({
        title: s.title || (s.content && (s.content['Titre'] || s.content['Titre 1'])) || 'Slide',
        template: s.template || 'VIBECODING - COVER CHAP',
        content: s.content || { Titre: s.title || 'Slide' }
      }));
    }

    const slideCount = parsedFinal.slides ? parsedFinal.slides.length : 0;
    const newStatus = phase === 'decoupe' ? 'sliced' : (slideCount > 1 ? 'written' : 'sliced');

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
