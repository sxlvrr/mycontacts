const authService = require('../services/auth.service');
const { successResponse, errorResponse, unauthorizedResponse } = require('../utils/apiResponse');

/**
 * Inscription d'un utilisateur
 */
const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    return successResponse(res, 201, 'Utilisateur créé avec succès', result);
  } catch (error) {
    if (error.message.includes('déjà utilisé')) {
      return errorResponse(res, 409, error.message);
    }
    return errorResponse(res, 400, error.message);
  }
};

/**
 * Connexion d'un utilisateur
 */
const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    return successResponse(res, 200, 'Connexion réussie', result);
  } catch (error) {
    return unauthorizedResponse(res, error.message);
  }
};

module.exports = {
  register,
  login,
};