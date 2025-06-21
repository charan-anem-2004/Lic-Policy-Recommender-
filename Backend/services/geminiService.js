import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// For embeddings
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
    console.error('Gemini Embedding Error:', error.response?.data || error.message || error);
    throw new Error('Failed to generate embedding');
  }
};

// For chat using Gemini Pro

export const chatWithGemini = async (userMessage) => {
  if (!userMessage || typeof userMessage !== 'string' || userMessage.trim() === '') {
    throw new Error('Invalid input for chat');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const result = await model.generateContent({
      contents: [{ parts: [{ text: userMessage }] }]
    });

    return result.response.text().trim();
  } catch (error) {
    console.error('Gemini Chat Error:', error?.response?.data || error.message || error);
    throw new Error('Failed to get chat response');
  }
};


