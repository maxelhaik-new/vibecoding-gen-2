import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import { supabase } from './_supabase.js';
import { getStaticReferenceRules, getExtractedTemplates } from './_rules.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const isSSE = req.headers.accept && req.headers.accept.includes('text/event-stream');

  const slug = req.query.lesson || req.query.slug || (req.body && req.body.slug);
  const phase = req.query.phase || (req.body && req.body.phase) || 'decoupe';

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
    } else {
      return res.status(400).json({ error: msg });
    }
  };

  if (!slug) {
    return sendError('Le paramètre lesson ou slug est requis (ex: ?lesson=m4c5l3)');
  }

  try {
    const cleanSlug = slug.toLowerCase();
    const { data: lesson, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('slug', cleanSlug)
      .single();

    if (error || !lesson) {
      return sendError(`Leçon ${cleanSlug} introuvable dans Supabase`);
    }

    if (!lesson.plan) {
      return sendError(`La leçon ${cleanSlug} n'a pas encore de plan MD sur lequel effectuer la découpe ou rédaction.`);
    }

    if (isSSE) {
      res.write(`data: [Pipeline] Démarrage de la phase ${phase} pour ${cleanSlug}...\n\n`);
    }

    // Token-optimized template extraction
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
      if (isSSE) res.write(`data: [Pipeline] Exécution du modèle Google Gemini...\n\n`);
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
      if (isSSE) res.write(`data: [Pipeline] Exécution OpenAI...\n\n`);
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
      return sendError('Aucune clé d\'API IA configurée dans Vercel.');
    }

    let cleanJson = generatedJsonText.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const parsedFinal = JSON.parse(cleanJson);

    // Ensure every slide has title and valid template structure
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
      return sendError(updateErr.message);
    }

    if (isSSE) {
      res.write(`data: [Pipeline] Phase ${phase} terminée avec succès ! ${slideCount} slides enregistrées dans Supabase.\n\n`);
      res.write(`data: [System] Process exited\n\n`);
      return res.end();
    }

    return res.status(200).json({
      success: true,
      phase,
      lesson: updated
    });

  } catch (err) {
    console.error('Error in run-pipeline execution:', err);
    return sendError(`Erreur de traitement: ${err.message}`);
  }
}
