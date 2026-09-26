// Vercel serverless function used by the Text tab to read text and fonts.
// Set ANTHROPIC_API_KEY in Vercel > Project > Settings > Environment Variables.
// Optional: ANTHROPIC_MODEL to use a different Claude model.
// Deploy with "Picture editor" as the project root so this file is served at /api/find-text.
const { Anthropic, APIError } = require('@anthropic-ai/sdk');

const MEDIA = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not set on the server' });
  const { image, prompt, mediaType } = req.body || {};
  if (!image || !prompt) return res.status(400).json({ error: 'Missing image or prompt' });
  const media_type = MEDIA.includes(mediaType) ? mediaType : 'image/jpeg';
  try {
    const client = new Anthropic();
    const msg = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5',
      max_tokens: 16000,
      messages: [{ role: 'user', content: [
        { type: 'image', source: { type: 'base64', media_type, data: image } },
        { type: 'text', text: prompt + '\nReply with JSON only.' }
      ] }]
    });
    if (msg.stop_reason === 'refusal') return res.status(422).json({ error: 'The picture could not be read' });
    const text = msg.content.filter(b => b.type === 'text').map(b => b.text).join('');
    const m = text.match(/\{[\s\S]*\}/);
    if (!m) return res.status(502).json({ error: 'No result from the model' });
    return res.status(200).json(JSON.parse(m[0]));
  } catch (e) {
    if (e instanceof APIError) return res.status(e.status || 502).json({ error: e.message });
    if (e instanceof SyntaxError) return res.status(502).json({ error: 'Could not read the result' });
    return res.status(502).json({ error: 'Failed to read text' });
  }
};
