// services/bioBertService.ts
import axios from 'axios';

// const HF_API_URL = 'https://api-inference.huggingface.co/models/dmis-lab/biobert-base-cased-v1.1';
const HF_API_URL = 'https://api-inference.huggingface.co/models/cure53/medgpt';

// const HF_API_TOKEN = process.env.HUGGING_FACE_API_KEY; // Store in environment variables
const HF_API_TOKEN = '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'; // Store in environment variables


export const getBioBertResults = async (text: string) => {
  try {
    const response = await axios.post(
      HF_API_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error calling BioBERT API:', error);
    throw error;
  }
};
