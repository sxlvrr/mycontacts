import api from './api';

export const contactService = {
  async getAll() {
    try {
      const response = await api.get('/contacts');
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/contacts/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async create(contactData) {
    try {
      const response = await api.post('/contacts', contactData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async update(id, contactData) {
    try {
      const response = await api.patch(`/contacts/${id}`, contactData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      const response = await api.delete(`/contacts/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
};