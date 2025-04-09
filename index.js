import express from 'express';
import { LlamaCpp } from "@langchain/community/llms/llama_cpp";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const modelPath = "./LLM/Open-Insurance-LLM-Llama3-8B.Q4_K_M.gguf";
const port = 3000;
const app = express();

// Add response caching
const responseCache = new Map();

// Initialize the model with optimized parameters
let model;
async function initializeModel() {
  try {
    model = await LlamaCpp.initialize({ 
      modelPath: modelPath,
      temperature: 0.7,
      maxTokens: 500,           // Limit output length
      contextSize: 2048,        // Reduce context window
      batchSize: 512,           // Optimize batch processing
      threads: 4,               // Optimize for quad-core CPU
      f16Kv: true,              // Use half-precision for key/value cache
      useMlock: true,           // Keep model in memory
      gpuLayers: 0              // CPU-only mode
    });
    console.log("Model initialized successfully");
    
    // Warm up the model with a simple query
    await model.invoke("Hello");
    console.log("Model warmed up");
  } catch (error) {
    console.error("Error initializing model:", error);
  }
}

// Root endpoint
app.get('/', (req, res) => {
    res.end('Hello, World!');
});

// Streaming response helper
function streamResponse(res, model, prompt) {
  return new Promise(async (resolve, reject) => {
    try {
      res.setHeader('Content-Type', 'text/html');
      res.write('<html><body><pre>');
      
      let fullResponse = '';
      
      // Stream the response
      const result = await model.invoke(prompt, {
        callbacks: [
          {
            handleLLMNewToken(token) {
              res.write(token);
              fullResponse += token;
            },
          },
        ],
      });
      
      res.write('</pre></body></html>');
      res.end();
      resolve(fullResponse);
    } catch (error) {
      reject(error);
    }
  });
}

// Optimized prompt template
const promptTemplate = `You are an LIC policy expert. Recommend a policy for:
- Age: {age} years
- Term: {premium_years} years
- Job: {occupation}
- Needs: {additional_info}

Give: 1) Policy name 2) Features 3) Why suitable 4) Premium range 5) Maturity benefits`;

// Test endpoint with streaming response
app.get('/test-model', async (req, res) => {
  try {
    if (!model) {
      return res.status(500).send("Model not initialized yet");
    }
    
    const age = 30;
    const premium_years = 10;
    const occupation = "Software Engineer";
    const additional_info = "Looking for a policy with good returns and low premium.";
    
    // Create cache key
    const cacheKey = `${age}-${premium_years}-${occupation}`;
    
    // Check cache first
    if (responseCache.has(cacheKey)) {
      console.log("Serving cached response");
      return res.send(responseCache.get(cacheKey));
    }
    
    // Format the prompt with variables
    const prompt = promptTemplate
      .replace('{age}', age)
      .replace('{premium_years}', premium_years)
      .replace('{occupation}', occupation)
      .replace('{additional_info}', additional_info);
    
    // Stream the response
    console.log("Generating response...");
    const fullResponse = await streamResponse(res, model, prompt);
    
    // Cache the response
    responseCache.set(cacheKey, fullResponse);
    
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

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Trying port ${port + 1}`);
      const newServer = app.listen(port + 1, async () => {
        console.log(`Server is running on http://localhost:${port + 1}`);
        await initializeModel();
      });
      newServer.on('error', (err) => {
        console.error('Error starting server on alternative port:', err);
      });
    } else {
      console.error('Error starting server:', err);
    }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  server.close();
  process.exit(0);
});
