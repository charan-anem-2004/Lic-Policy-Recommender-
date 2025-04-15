import { searchSimilarPolicies } from '../services/vectorService.js';
import Policy from '../models/Policy.js';
import { getEmbedding } from '../services/geminiService.js';

export const searchPolicies = async (req, res) => {
  try {
    const { query } = req.query;
    console.log("Search query:", query);

    const queryEmbedding = await getEmbedding(query);
    console.log("Got embedding");

    const vectorResults = await searchSimilarPolicies(query);
    console.log("Vector search done");

    const policyIds = vectorResults.map(r => r.id);

    // Use lean() for plain JS objects and better performance
    const policies = await Policy.find({
      _id: { $in: policyIds }
    }).lean(); // ensures all fields come in as plain objects

    //  Create a map for quick lookup
    const policyMap = new Map(policies.map(p => [p._id.toString(), p]));

    // Merge similarity and return full data
    const results = vectorResults.map(vResult => {
      const policy = policyMap.get(vResult.id);
      if (!policy) {
        console.warn(`Policy with ID ${vResult.id} not found in MongoDB.`);
        return null;
      }

      return {
        ...policy, // all properties from DB
        similarity: vResult.similarity // add similarity
      };
    }).filter(Boolean); // remove nulls

    res.json(results);
  } catch (error) {
    console.error("Error in searchPolicies:", error);
    res.status(500).json({ error: error.message });
  }
};
