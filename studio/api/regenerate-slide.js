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
  const slideIndex = parseInt(req.query.slide_index || (req.body && req.body.slide_index) || '0', 10);
  const instruction = req.query.instruction || (req.body && req.body.instruction) || '';

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
    return sendError('Le paramètre lesson ou slug est requis.');
  }

  try {
    const cleanSlug = slug.toLowerCase();
    const { data: lesson, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('slug', cleanSlug)
      .single();

    if (error || !lesson || !lesson.final || !Array.isArray(lesson.final.slides)) {
      return sendError(`Leçon ${cleanSlug} ou slides introuvables`);
    }

    const currentSlide = lesson.final.slides[slideIndex];
    if (!currentSlide) {
      return sendError(`Slide à l'index ${slideIndex} introuvable`);
    }

    if (isSSE) {
      res.write(`data: [Pipeline] Régénération de la slide ${slideIndex + 1} (${currentSlide.template})...\n\n`);
    }

    const staticRules = getStaticReferenceRules();
    const targetedTemplates = getExtractedTemplates([currentSlide.template]);

    const systemPrompt = `Tu es l'expert Vibe Slicer.
Ta mission est de régénérer LE CONTENU DE LA SLIDE SUIVANTE selon les instructions fournies :

Slide actuelle à modifier :
Template: ${currentSlide.template}
Contenu actuel: ${JSON.stringify(currentSlide.content, null, 2)}

Instruction de modification :
${instruction}

Règles de marque et de contraintes de champs :
${staticRules}
${JSON.stringify(targetedTemplates, null, 2)}

Renvoie EXCLUSIVEMENT un objet JSON représentant le nouveau contenu sous la forme :
{
  "content": { ... }
}`;

    let generatedText = '';
    if (process.env.GEMINI_API_KEY) {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: systemPrompt,
        config: { responseMimeType: 'application/json', temperature: 0.3 }
      });
      generatedText = response.text;
    } else if (process.env.OPENAI_API_KEY) {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }],
        response_format: { type: 'json_object' }
      });
      generatedText = completion.choices[0].message.content;
    } else {
      return sendError('Aucune clé API IA configurée.');
    }

    let cleanJson = generatedText.trim();
    if (cleanJson.startsWith('```json')) cleanJson = cleanJson.replace(/^```json/, '').replace(/```$/, '').trim();
    const parsed = JSON.parse(cleanJson);

    // Update only target slide
    const updatedSlides = [...lesson.final.slides];
    updatedSlides[slideIndex] = {
      ...currentSlide,
      content: parsed.content || parsed
    };

    const updatedFinal = { ...lesson.final, slides: updatedSlides };

    await supabase
      .from('lessons')
      .update({ final: updatedFinal, updated_at: new Date().toISOString() })
      .eq('slug', cleanSlug);

    if (isSSE) {
      res.write(`data: [Pipeline] Slide ${slideIndex + 1} régénérée avec succès !\n\n`);
      res.write(`data: [System] Process exited\n\n`);
      return res.end();
    }

    return res.status(200).json({ success: true, slide: updatedSlides[slideIndex] });

  } catch (err) {
    return sendError(`Erreur: ${err.message}`);
  }
}
