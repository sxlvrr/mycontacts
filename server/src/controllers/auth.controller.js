const authService = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * Inscription d'un utilisateur
 */
const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    return successResponse(res, 201, 'Utilisateur créé avec succès', result);
  } catch (error) {
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
    return errorResponse(res, 401, error.message);
  }
};

module.exports = {
  register,
  login,
};