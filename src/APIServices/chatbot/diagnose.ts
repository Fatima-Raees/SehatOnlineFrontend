import axios from 'axios';

interface DiagnosisRequest {
  symptoms: string;
}

interface DiagnosisResponse {
  diagnosis: string;
}

const HF_API_TOKEN = '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';

// Export handler function for direct import
export async function handler(req: { method: string; body: DiagnosisRequest }, res: { status: (code: number) => { json: (data: any) => void } }) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { symptoms } = req.body;
    
    if (!symptoms || typeof symptoms !== 'string') {
      return res.status(400).json({ message: 'Valid symptoms string is required' });
    }
    
    console.log("Processing diagnosis request for symptoms:", symptoms);
    
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/shanover/medbot_godel_v3',
      { inputs: symptoms },
      {
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.status(200).json({ diagnosis: response.data[0].generated_text } as DiagnosisResponse);
  } catch (error: any) {
    console.error('Error calling Hugging Face API:', error);
    return res.status(500).json({ 
      message: 'Error processing diagnosis request',
      error: error.response?.data || error.message 
    });
  }
}

// Default export for Next.js API routes
export default handler;