import { ChromaClient } from 'chromadb';
import { getEmbedding } from './geminiService.js';
import Policy from '../models/Policy.js';

// Initialize Chroma client with Docker connection
const chroma = new ChromaClient({
  path: "https://dockerchromadb-production.up.railway.app"
});


// Declare collection variable at the module level
let collection;

// Custom embedding function class for Gemini
class GeminiEmbeddingFunction {
  constructor() {}
  
  async generate(texts) {
    if (!Array.isArray(texts)) {
      throw new Error("Input must be an array of strings");
    }
    
    const embeddings = [];
    for (const text of texts) {
      if (typeof text !== 'string') {
        console.warn(`Invalid input type: expected string, got ${typeof text}. Converting to string.`);
        const stringText = String(text);
        const embedding = await getEmbedding(stringText);
        embeddings.push(embedding);
      } else {
        const embedding = await getEmbedding(text);
        embeddings.push(embedding);
      }
    }
    return embeddings;
  }
}

// Initialize the vector database and load policies from MongoDB
export const initializeVectorDB = async () => {
  try {
    // Initialize or get the ChromaDB collection
    collection = await chroma.getOrCreateCollection({
      name: "lic_policies",
      embeddingFunction: new GeminiEmbeddingFunction()
    });
    console.log('ChromaDB collection initialized');

    // Check if the collection already contains items
    const existingItems = await collection.count();
    
    if (existingItems === 0) {
      console.log('ChromaDB collection is empty. Loading all policies from MongoDB...');
      // If the collection is empty, load all policies from MongoDB
      await loadPoliciesFromMongoDB();
    } else {
      console.log(`ChromaDB collection already contains ${existingItems} items. Incremental update in progress...`);
      // Load only policies that have not yet been vectorized
      await loadPoliciesFromMongoDB();
    }

    return collection;
  } catch (error) {
    console.error('ChromaDB initialization failed:', error);
    throw error;
  }
};



// Load all *new* (non-vectorized) policies from MongoDB and add them to ChromaDB
export const loadPoliciesFromMongoDB = async () => {
  try {
    // Fetch only policies that have not yet been vectorized
    const policies = await Policy.find({ vectorized: { $ne: true } });
    console.log(`Found ${policies.length} new policies to vectorize`);

    if (policies.length === 0) {
      console.log('No new policies to vectorize. All caught up!');
      return;
    }

    const BATCH_SIZE = 10;
    for (let i = 0; i < policies.length; i += BATCH_SIZE) {
      const batch = policies.slice(i, i + BATCH_SIZE);
      console.log(
        `Processing batch ${i / BATCH_SIZE + 1} of ${Math.ceil(
          policies.length / BATCH_SIZE
        )}`
      );

      const ids = batch.map((policy) => policy._id.toString());

      const documents = batch.map((policy) => {
        return `Policy Name: ${policy.name}. 
Description: ${policy.description}. 
Type: ${policy.type}. 
Plan Number: ${policy.planNumber}. 
UIN: ${policy.uin}. 
Entry Age: ${policy.entryAge}. 
Term: ${policy.term}. 
Sum Assured: ${policy.sumAssured}. 
Premium: ${policy.premium}.`;
      });

      const metadatas = batch.map((policy) => ({
        name: policy.name,
        type: policy.type,
        planNumber: policy.planNumber,
        uin: policy.uin,
        entryAge: policy.entryAge,
        term: policy.term,
        sumAssured: policy.sumAssured,
        premium: policy.premium,
      }));

      // Add this batch to ChromaDB
      await collection.add({
        ids,
        documents,
        metadatas,
      });

      //  Mark these policies as vectorized in MongoDB
      await Policy.updateMany(
        { _id: { $in: ids } },
        { $set: { vectorized: true } }
      );

      console.log(` Vectorized and marked ${batch.length} policies`);
    }

    console.log('Incremental policy sync to ChromaDB complete');
  } catch (error) {
    console.error(' Error loading policies from MongoDB to ChromaDB:', error);
    throw new Error('Failed to load policies from MongoDB to ChromaDB');
  }
};


// Add a single policy to vector database
export const addPolicyVector = async (policy) => {
  if (!collection) {
    await initializeVectorDB();
  }
  
  try {
    // Create rich document text that includes all relevant policy information
    const document = `Policy Name: ${policy.name}. 
                      Description: ${policy.description}. 
                      Type: ${policy.type}. 
                      Plan Number: ${policy.planNumber}. 
                      UIN: ${policy.uin}. 
                      Entry Age: ${policy.entryAge}. 
                      Term: ${policy.term}. 
                      Sum Assured: ${policy.sumAssured}. 
                      Premium: ${policy.premium}.`;
    
    await collection.add({
      ids: [policy._id.toString()],
      documents: [document],
      metadatas: [{
        name: policy.name,
        type: policy.type,
        planNumber: policy.planNumber,
        uin: policy.uin,
        entryAge: policy.entryAge,
        term: policy.term,
        sumAssured: policy.sumAssured,
        premium: policy.premium
      }]
    });
    console.log(`Added policy ${policy.name} to vector database`);
  } catch (error) {
    console.error('Error adding to vector DB:', error);
    throw new Error('Vector storage failed');
  }
};

// Search similar policies
export const searchSimilarPolicies = async (queryText) => {
  if (!collection) {
    await initializeVectorDB();
  }
  
  try {
    if (!queryText || typeof queryText !== 'string' || queryText.trim() === '') {
      throw new Error('Invalid search query');
    }
    
    console.log(`Searching for policies similar to: "${queryText}"`);
    
    const results = await collection.query({
      queryTexts: [queryText],
      nResults: 2,
      include: ["metadatas", "distances", "documents"]
    });
    
    // Handle empty results
    if (!results.ids[0] || results.ids[0].length === 0) {
      console.log('No similar policies found');
      return [];
    }
    
    console.log(`Found ${results.ids[0].length} similar policies`);
    
    return results.ids[0].map((id, index) => ({
      id,
      similarity: parseFloat((1 - results.distances[0][index]).toFixed(2)),
      document: results.documents[0][index],
      ...results.metadatas[0][index]
    }));
  } catch (error) {
    console.error('Vector search error:', error);
    throw new Error('Search operation failed');
  }
};

// Utility function to refresh the vector database (clear and reload from MongoDB)
export const refreshVectorDatabase = async () => {
  try {
    if (collection) {
      console.log('Deleting existing collection...');
      await chroma.deleteCollection({ name: "lic_policies" });
    }
    
    console.log('Creating new collection...');
    collection = await chroma.createCollection({
      name: "lic_policies",
      embeddingFunction: new GeminiEmbeddingFunction()
    });
    
    console.log('Loading policies from MongoDB...');
    await loadPoliciesFromMongoDB();
    
    console.log('Vector database refreshed successfully');
  } catch (error) {
    console.error('Error refreshing vector database:', error);
    throw new Error('Failed to refresh vector database');
  }
};

// Update a policy in the vector database
export const updatePolicyVector = async (policy) => {
  if (!collection) {
    await initializeVectorDB();
  }
  
  try {
    const policyId = policy._id.toString();
    
    // First, delete the existing policy
    await collection.delete({
      ids: [policyId]
    });
    
    // Then add the updated policy
    await addPolicyVector(policy);
    
    console.log(`Updated policy ${policy.name} in vector database`);
  } catch (error) {
    console.error('Error updating vector DB:', error);
    throw new Error('Vector update failed');
  }
};

// Delete a policy from the vector database
export const deletePolicyVector = async (policyId) => {
  if (!collection) {
    await initializeVectorDB();
  }
  
  try {
    await collection.delete({
      ids: [policyId.toString()]
    });
    
    console.log(`Deleted policy ${policyId} from vector database`);
  } catch (error) {
    console.error('Error deleting from vector DB:', error);
    throw new Error('Vector deletion failed');
  }
};

// Export the collection for direct access if needed
export const getCollection = async () => {
  if (!collection) {
    await initializeVectorDB();
  }
  return collection;
};
