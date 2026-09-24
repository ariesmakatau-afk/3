// Vercel serverless function. Set ANTHROPIC_API_KEY in Vercel > Project > Settings > Environment Variables.
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const { image, prompt } = req.body || {};
  if (!image || !prompt) return res.status(400).json({ error: 'Missing image or prompt' });
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 4000,
        messages: [{ role: 'user', content: [
          { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: image } },
          { type: 'text', text: prompt + '\nReply with JSON only.' }
        ] }]
      })
    });
    const d = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: (d.error && d.error.message) || 'API error' });
    const text = (d.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
    const m = text.match(/\{[\s\S]*\}/);
    return res.status(200).json(JSON.parse(m ? m[0] : text));
  } catch (e) {
    return res.status(502).json({ error: 'Failed to read text' });
  }
};
