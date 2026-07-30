import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import { supabase } from './_supabase.js';
import { getReferenceRules } from './_rules.js';

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

    const referenceRules = getReferenceRules();

    const validTemplatesList = `
TEMPLATES DE SLIDES OFFICIELS VIBECODING EXCLUSIFS (N'INVENTE AUCUN AUTRE NOM) :
- "VIBECODING - COVER CHAP" (Titre)
- "VIBECODING - COVER" (Titre, SousTitre)
- "VIBECODING - INTRO" (Titre, Intro, Titre 1, Texte 1, Titre 2, Texte 2)
- "VIBECODING - OBJECTIF CHAP" (Titre, Intro, Titre 1..6)
- "VIBECODING - PROCESS" (Titre, Etape 1..4, Description 1..4)
- "VIBECODING - CONCEPT" (Titre, Intro, Concept 1..3)
- "VIBECODING - DEFINITION" (Titre, MotCle, Definition)
- "VIBECODING - COMPARISON" (Titre, OptionA, OptionB, AvantagesA, AvantagesB)
- "VIBECODING - EXERCICE" (Titre, Consigne, Question 1..3)
- "VIBECODING - FOCUS OUTIL" (Titre, Description, Avantage 1..3)
- "VIBECODING - FIN" (Titre, EnBref, Transition)
`;

    let phaseInstruction = '';
    if (phase === 'decoupe') {
      phaseInstruction = `OBJECTIF DE LA PHASE DECOUPE :
Analyse le plan Markdown et génère 5 à 9 slides.
Utilise EXCLUSIVEMENT les noms de templates officiels ci-dessus. N'invente PAS de noms comme "TITRE_PRINCIPAL" ou "POINTS_CLES".`;
    } else {
      phaseInstruction = `OBJECTIF DE LA PHASE ECRIS (RÉDACTION COMPLÈTE) :
Rédige intégralement l'ensemble des slides du cours (6 à 10 slides).
Utilise EXCLUSIVEMENT les noms de templates officiels ci-dessus.
La dernière slide doit obligatoirement être "VIBECODING - FIN".`;
    }

    const systemPrompt = `Tu es l'expert Vibe Slicer. Tu prends un plan de cours Markdown et tu génères un objet JSON valide de slides de cours selon les règles ci-dessous.

${referenceRules}

${validTemplatesList}

${phaseInstruction}

INSTRUCTION STRICTE DE FORMAT JSON :
Le JSON doit impérativement respecter la structure exacte ci-dessous :
{
  "lessonTitle": "${lesson.title}",
  "lessonType": "${lesson.type}",
  "slides": [
    {
      "template": "NOM_EXACT_DU_TEMPLATE_OFFICIEL",
      "content": {
        "Titre": "..."
      }
    }
  ]
}
Renvoie EXCLUSIVEMENT le JSON valide brut, sans aucun texte d'introduction ni balises de bloc de code markdown.`;

    let generatedJsonText = '';

    if (process.env.GEMINI_API_KEY) {
      if (isSSE) res.write(`data: [Pipeline] Exécution du modèle Google Gemini pour la phase ${phase}...\n\n`);
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemPrompt}\n\nVoici le plan Markdown de la leçon :\n${lesson.plan}`,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.1
        }
      });
      generatedJsonText = response.text;
    } else if (process.env.OPENAI_API_KEY) {
      if (isSSE) res.write(`data: [Pipeline] Exécution du modèle OpenAI pour la phase ${phase}...\n\n`);
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Voici le plan Markdown de la leçon :\n${lesson.plan}` }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.1
      });
      generatedJsonText = completion.choices[0].message.content;
    } else {
      return sendError('Aucune clé d\'API IA (GEMINI_API_KEY ou OPENAI_API_KEY) n\'est configurée dans Vercel.');
    }

    let cleanJson = generatedJsonText.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const parsedFinal = JSON.parse(cleanJson);
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
      res.write(`data: [Pipeline] Phase ${phase} terminée avec succès ! ${slideCount} slides générées et enregistrées dans Supabase.\n\n`);
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
    return sendError(`Erreur de traitement JSON ou API: ${err.message}`);
  }
}
