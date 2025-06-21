// routes/chatRoutes.js
import express from 'express';
import { chatAboutRecommendations } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', chatAboutRecommendations);

export default router;
