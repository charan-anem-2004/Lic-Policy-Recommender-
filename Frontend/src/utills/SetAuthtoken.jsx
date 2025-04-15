// utils/setAuthToken.js
import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Set the default header for all future requests
    axios.defaults.headers.common['x-auth-token'] = token;
    // Also store in localStorage for persistence
    localStorage.setItem('token', token);
  } else {
    // Remove from default headers
    delete axios.defaults.headers.common['x-auth-token'];
    // Also remove from localStorage
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
