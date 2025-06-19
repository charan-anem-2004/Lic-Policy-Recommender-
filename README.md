A smart, AI-powered recommender system to help users discover the most suitable LIC (Life Insurance Corporation) policies based on their input. It uses semantic search powered by vector embeddings to understand user intent and match the best-fitting policies.

🚀 Features
🔐 User-friendly API with policy search functionality

🧠 Semantic search with Google Gemini embeddings + ChromaDB

📦 Stores LIC policies in MongoDB

🔄 Keeps vector database synced with MongoDB (only vectorizes new policies)

🛠 Admin endpoint to refresh vector database

📊 Rich metadata stored for every policy (type, term, age, premium, etc.)

🧰 Tech Stack

Tech	Description: 

Node.js	Backend runtime environment

Express.js	API framework

JWT for Authentication

MongoDB	Database for storing policies

Mongoose	MongoDB object modeling

Docker for running chromaDB image

ChromaDB	Vector database for embeddings

Gemini API	To generate vector embeddings

dotenv	For environment configuration

CORS	For handling cross-origin requests

🛠 Setup Instructions

step 1:Clone the repo

git clone https://github.com/charan-anem-2004/Lic-Policy-Recommender-




step 2:Install dependencies

npm install


step 3:Create a .env file with these

MONGO_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_google_gemini_api_key

PORT=5000

step 4: chromaDB setup

if you have chromaDB locally give the connection inside the chromaDB initialization function

or else

run the chromaDB image in the docker with port 8000 with this command(make sure you have docker installed)

docker run -d --name chromadb -p 8000:8000 -e IS_PERSISTENT=TRUE chromadb/chroma:0.6.3



step 5:Start the fontend

cd frontend

npm run dev


step 6:start the backend

cd backend

npm start
