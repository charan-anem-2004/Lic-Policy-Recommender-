import express from 'express';
import { refreshVectorDatabase } from '../services/vectorService.js';  // Import the function

const router = express.Router();

// Endpoint to refresh vector database
router.post('/', async (req, res) => {
  try {
    console.log('Refreshing vector database...');
    await refreshVectorDatabase();  // Call the function to refresh the vector database
    res.status(200).json({ message: 'Vector database refreshed successfully' });
  } catch (error) {
    console.error('Error refreshing vector database:', error);
    res.status(500).json({ error: 'Failed to refresh vector database' });
  }
});
export default router;


