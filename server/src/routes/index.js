const express = require('express');
const authRoutes = require('./auth.routes');
const contactRoutes = require('./contact.routes');
const { successResponse } = require('../utils/apiResponse');

const router = express.Router();

// Route de base pour vérifier l'API
router.get('/', (req, res) => {
  return successResponse(res, 200, 'API MyContacts - Architecture Professionnelle', {
    version: '2.0.0',
    documentation: '/api-docs',
    endpoints: {
      auth: {
        register: 'POST /auth/register',
        login: 'POST /auth/login'
      },
      contacts: {
        list: 'GET /contacts',
        create: 'POST /contacts',
        update: 'PATCH /contacts/:id',
        delete: 'DELETE /contacts/:id'
      },
      protected: {
        profile: 'GET /profile'
      }
    },
    features: [
      'Architecture en couches',
      'Réponses API standardisées',
      'Validation des données',
      'Gestion d\'erreurs centralisée',
      'Documentation Swagger'
    ]
  });
});

// Routes d'authentification
router.use('/auth', authRoutes);

// Routes de contacts
router.use('/contacts', contactRoutes);

module.exports = router;