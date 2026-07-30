export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);
  const hasAnthropic = Boolean(process.env.ANTHROPIC_API_KEY);

  return res.status(200).json({
    status: 'online',
    mode: 'serverless',
    hasKey: hasOpenAI || hasGemini || hasAnthropic,
    providers: {
      openai: hasOpenAI,
      gemini: hasGemini,
      anthropic: hasAnthropic
    },
    defaultModel: hasGemini ? 'gemini-2.5-flash' : (hasOpenAI ? 'gpt-4o-mini' : 'claude-3-5-sonnet-20241022')
  });
}
