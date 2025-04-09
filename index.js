import express from 'express';
import { LlamaCpp } from "@langchain/community/llms/llama_cpp";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const modelPath = "./LLM/Open-Insurance-LLM-Llama3-8B.Q4_K_M.gguf";

const port = 3000;
const app = express();

// Initialize the model when the server starts
let model;
async function initializeModel() {
  try {
    model = await LlamaCpp.initialize({ 
      modelPath: modelPath,
      temperature: 0.7,
      maxTokens: 4000,       // Set very high to ensure complete responses
      n_ctx: 4096,           // Maximum context window
      n_batch: 512,          // Optimize batch processing
      repeat_penalty: 1.02,  // Low repetition penalty as recommended
      f16_kv: true           // Memory optimization
    });
    
    console.log("Model initialized successfully");
  } catch (error) {
    console.error("Error initializing model:", error);
  }
}

// Root endpoint
app.get('/', (req, res) => {
    res.end('Hello, World!');
});

// Test endpoint for the model
app.get('/test-model', async (req, res) => {
  try {
    if (!model) {
      return res.status(500).send("Model not initialized yet");
    }
    
    const prompt = ChatPromptTemplate.fromTemplate(
      `Answer the following question if you don't know the answer say so: Question: {input}`
    );

    const chain = prompt.pipe(model);
    const age = 10;
    const premium_years = 10;
    const occupation = "student";
    const additional_info = "Looking for a policy with high returns and low risk.";

    // Invoke the chain
    const result = await chain.invoke({ 
      input: `
    Please recommend the best LIC insurance policy for a person with the following details:
    - Age: ${age} years
    - Premium Payment Term: ${premium_years} years
    - Occupation: ${occupation}
    - Additional Information: ${additional_info}
    
    Provide a detailed recommendation including:
    1. Policy name
    2. Key features and benefits
    3. Why this policy is suitable for this person
    4. Premium estimate (approximate range)
    5. Maturity benefits
    
    Base your recommendation on actual LIC policies available in India.
    `
    });
    
    console.log(result);
    res.send(result);
  } catch (error) {
    console.error("Error invoking model:", error);
    res.status(500).send("Error processing request");
  }
});

// Start the server and initialize the model
const server = app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    await initializeModel();
});

server.on('error', (err) => {
    console.error('Error starting server:', err);
});