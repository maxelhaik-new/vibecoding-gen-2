import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import { supabase } from '../_supabase.js';
import { getReferenceRules } from '../_rules.js';

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

  const { messages, activeLessonSlug } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  // Fetch active lesson context if provided
  let lessonContext = '';
  if (activeLessonSlug) {
    const { data: lesson } = await supabase
      .from('lessons')
      .select('*')
      .eq('slug', activeLessonSlug.toLowerCase())
      .single();

    if (lesson) {
      lessonContext = `\nContext de la leçon active (${lesson.slug}) :\nTitre: ${lesson.title}\nPlan:\n${lesson.plan || 'Aucun plan'}\nSlides JSON:\n${JSON.stringify(lesson.final || {}, null, 2)}`;
    }
  }

  // Load strict reference rules dynamically from files
  const referenceRules = getReferenceRules();

  const systemInstruction = `Tu es l'assistant Vibe Slicer. Tu aides l'utilisateur à créer, structurer, découper et rédiger des leçons de cours avec des slides JSON.
Respecte scrupuleusement l'ensemble des règles de marque, de style et de templates ci-dessous :

${referenceRules}

${lessonContext}`;

  try {
    // 1. Try Gemini API if available
    if (process.env.GEMINI_API_KEY) {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const contents = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7
        }
      });

      return res.status(200).json({
        content: response.text
      });
    }

    // 2. Fallback to OpenAI API if available
    if (process.env.OPENAI_API_KEY) {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const formattedMsgs = [
        { role: 'system', content: systemInstruction },
        ...messages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content }))
      ];

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: formattedMsgs,
        temperature: 0.7
      });

      const reply = completion.choices[0].message.content;
      return res.status(200).json({
        content: reply
      });
    }

    return res.status(400).json({
      error: 'Aucune clé d\'API IA configurée (GEMINI_API_KEY ou OPENAI_API_KEY). Veuillez ajouter vos clés dans les variables d\'environnement Vercel.'
    });

  } catch (err) {
    console.error('Error in agent chat endpoint:', err);
    return res.status(500).json({ error: err.message });
  }
}
