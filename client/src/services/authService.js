import api from './api';

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response;
    } catch (error) {
      throw error;
    }
  },

  async register(email, password) {
    try {
      const response = await api.post('/auth/register', { email, password });
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response;
    } catch (error) {
      throw error;
    }
  }
};