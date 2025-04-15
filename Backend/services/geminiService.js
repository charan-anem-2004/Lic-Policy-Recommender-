import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);



export const getEmbedding = async (text) => {
  if (!text || typeof text !== 'string' || text.trim() === '') {
    throw new Error('Invalid input for embedding');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'embedding-001' });

    const result = await model.embedContent({
      content: {
        parts: [{ text }]
      }
    });

    return result.embedding.values;
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message || error);
    throw new Error('Failed to generate embedding');
  }
};