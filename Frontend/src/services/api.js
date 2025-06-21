import axios from 'axios';

const API_BASE_URL = 'https://lic-policy-recommender-backend.onrender.com'; // Update with your backend URL

export const searchPolicies = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/search`, {
      params: { query }, // ✅ not q, use query
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching policies:', error);
    return [];
  }
};


export const addPolicy = async (policyData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/policies`, policyData);
    return response.data;
  } catch (error) {
    console.error('Error adding policy:', error);
    return null;
  }
};