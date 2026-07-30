import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const templatesPath = path.join(process.cwd(), '..', 'templates.json');
    if (fs.existsSync(templatesPath)) {
      const data = fs.readFileSync(templatesPath, 'utf-8');
      return res.status(200).json(JSON.parse(data));
    }

    // Fallback if copied to studio
    const studioTemplatesPath = path.join(process.cwd(), 'templates.json');
    if (fs.existsSync(studioTemplatesPath)) {
      const data = fs.readFileSync(studioTemplatesPath, 'utf-8');
      return res.status(200).json(JSON.parse(data));
    }

    return res.status(404).json({ error: 'templates.json not found' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
