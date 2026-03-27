import axios from 'axios';

// During local dev, this falls back to localhost. In production, Vite injects the Railway URL.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Required for cookies/sessions to work across domains
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example function to verify connection
export const checkHealth = async () => {
  const { data } = await apiClient.get('/health');
  return data;
};
