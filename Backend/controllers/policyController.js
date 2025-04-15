import Policy from '../models/Policy.js';
import { addPolicyVector } from '../services/vectorService.js';

export const createPolicy = async (req, res) => {
  try {
    const policy = new Policy(req.body);
    await policy.save();
    
    // Add to vector DB
    await addPolicyVector(policy);
    
    res.status(201).json(policy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};