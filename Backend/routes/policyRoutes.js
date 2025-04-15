import express from 'express';
import { createPolicy } from '../controllers/policyController.js';

const router = express.Router();

router.post('/', createPolicy);

export default router;
