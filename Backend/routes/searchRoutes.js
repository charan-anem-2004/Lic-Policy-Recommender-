import express from 'express';
import { searchPolicies } from '../controllers/searchController.js';

const router = express.Router();

router.get('/', searchPolicies);

export default router;
