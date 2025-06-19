# Use an official Python base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies (if needed)
RUN apt-get update && apt-get install -y build-essential

# Install chromadb
RUN pip install chromadb

# Expose ChromaDB default port
EXPOSE 8000

# Command to run ChromaDB server
CMD ["python", "-m", "chromadb.cli", "run"]