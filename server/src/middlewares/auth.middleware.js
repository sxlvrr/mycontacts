const { verifyToken } = require('../services/token.service');
const User = require('../models/user.model');
const { errorResponse } = require('../utils/apiResponse');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 401, 'Token manquant ou invalide');
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return errorResponse(res, 401, 'Utilisateur introuvable');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return errorResponse(res, 401, 'Token invalide');
    }
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 401, 'Token expiré');
    }
    return errorResponse(res, 500, 'Erreur serveur');
  }
};

module.exports = authMiddleware;