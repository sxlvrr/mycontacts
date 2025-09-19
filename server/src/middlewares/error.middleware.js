const { errorResponse } = require('../utils/apiResponse');

/**
 * Middleware de gestion centralisée des erreurs
 */
const errorMiddleware = (err, req, res, next) => {
  console.error('Erreur:', err);

  // Erreur de validation Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => ({
      field: error.path,
      message: error.message
    }));
    return errorResponse(res, 400, 'Erreurs de validation', errors);
  }

  // Erreur de duplication MongoDB
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return errorResponse(res, 400, `${field} déjà existant`);
  }

  // Erreur de cast MongoDB (ID invalide)
  if (err.name === 'CastError') {
    return errorResponse(res, 400, 'ID invalide');
  }

  // Erreur par défaut
  return errorResponse(res, 500, 'Erreur interne du serveur');
};

module.exports = errorMiddleware;