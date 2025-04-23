// pages/api/diagnose.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Only POST requests allowed' });
    }
  
    const { message } = req.body;
  
    try {
      const response = await fetch('https://api-inference.huggingface.co/models/shanover/medbot_godel_v3', {
        method: 'POST',
        headers: {
          Authorization: `Bearer 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`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: message,
        }),
      });
  
      const data = await response.json();
  
      // Hugging Face returns an array of generated text
      const reply = data?.[0]?.generated_text || 'Sorry, I couldn’t get a response.';
  
      res.status(200).json({ reply });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch from Hugging Face API' });
    }
  }
  