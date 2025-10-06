const { validationErrorResponse } = require('../utils/apiResponse');

/**
 * Middleware de validation pour l'inscription
 */
const validateRegister = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push({ field: 'email', message: 'Email requis' });
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.push({ field: 'email', message: 'Format email invalide' });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Mot de passe requis' });
  } else if (password.length < 6) {
    errors.push({ field: 'password', message: 'Mot de passe minimum 6 caractères' });
  }

  if (errors.length > 0) {
    return validationErrorResponse(res, errors);
  }

  next();
};

/**
 * Middleware de validation pour la connexion
 */
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push({ field: 'email', message: 'Email requis' });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Mot de passe requis' });
  }

  if (errors.length > 0) {
    return validationErrorResponse(res, errors);
  }

  next();
};

/**
 * Middleware de validation pour les contacts
 */
const validateContact = (req, res, next) => {
  const { firstName, lastName, phone } = req.body;
  const errors = [];

  if (!firstName) {
    errors.push({ field: 'firstName', message: 'Prénom requis' });
  }

  if (!lastName) {
    errors.push({ field: 'lastName', message: 'Nom requis' });
  }

  if (!phone) {
    errors.push({ field: 'phone', message: 'Téléphone requis' });
  } else if (phone.length < 10 || phone.length > 20) {
    errors.push({ field: 'phone', message: 'Téléphone entre 10 et 20 caractères' });
  }

  if (errors.length > 0) {
    return validationErrorResponse(res, errors);
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateContact,
};