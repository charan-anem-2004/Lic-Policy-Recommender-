import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import policyRoutes from './routes/policyRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import { initializeVectorDB } from './services/vectorService.js';
import vectorrefresh from './routes/vectorrefresh.js'; // Import the vector-refresh route
import Auth from './routes/Auth.js'; // Import the Auth route
import chatRoutes from './routes/chatRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/policies', policyRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/vector-refresh',vectorrefresh)
app.use('/api/auth', Auth);
app.use('/api/chat', chatRoutes);

// Database connection
await connectDB();
try {
  await initializeVectorDB();
} catch (error) {
  if (error.message.includes("already exists")) {
    console.log("Collection already exists - skipping initialization");
  } else {
    throw error;
  }
}


app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
