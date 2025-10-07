import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Log pour vérifier l'URL de l'API
console.log('🔗 API Base URL:', API_BASE_URL);
console.log('🌍 Environment:', process.env.NODE_ENV);

// Créer une instance axios avec configuration de base
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Augmenté à 30s pour cold start Render
  headers: {
    'Content-Type': 'application/json',
  }
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.url);
    return response.data;
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    
    // Gérer les erreurs d'authentification
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Retourner l'erreur dans un format standardisé
    const errorResponse = {
      success: false,
      error: error.response?.data?.error || {
        message: error.message || 'Une erreur est survenue',
        status: error.response?.status || 500
      }
    };
    
    return Promise.reject(errorResponse);
  }
);

export default api;