const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { swaggerUi, specs } = require('./utils/swagger');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connecté'))
.catch(err => console.error('Erreur MongoDB:', err));

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/auth', require('./routes/auth'));

// Route de base
app.get('/', (req, res) => {
  res.json({ 
    message: 'API MyContacts - Jour 1',
    documentation: '/api-docs'
  });
});

module.exports = app;