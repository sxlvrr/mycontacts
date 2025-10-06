const { errorResponse } = require('../utils/apiResponse');

/**
 * Middleware de gestion centralisée des erreurs
 */
const errorMiddleware = (err, req, res, next) => {
  console.error('🚨 Erreur interceptée:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Erreur de validation Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => ({
      field: error.path,
      message: error.message,
      value: error.value
    }));
    return errorResponse(res, 400, 'Erreurs de validation', errors);
  }

  // Erreur de duplication MongoDB (index unique)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    return errorResponse(res, 409, `Conflit: ${field} "${value}" déjà existant`);
  }

  // Erreur de cast MongoDB (ID invalide)
  if (err.name === 'CastError') {
    return errorResponse(res, 400, `ID invalide: ${err.value}`);
  }

  // Erreur JWT
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 401, 'Token JWT invalide');
  }

  // Erreur JWT expiré
  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 401, 'Token JWT expiré');
  }

  // Erreur de connexion MongoDB
  if (err.name === 'MongooseError' || err.name === 'MongoError') {
    return errorResponse(res, 503, 'Service de base de données temporairement indisponible');
  }

  // Erreur de syntaxe JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return errorResponse(res, 400, 'Format JSON invalide');
  }

  // Erreur par défaut
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Erreur interne du serveur';
  
  return errorResponse(res, statusCode, message);
};

/**
 * Middleware pour gérer les routes non trouvées
 */
const notFoundMiddleware = (req, res, next) => {
  return errorResponse(res, 404, `Route ${req.method} ${req.originalUrl} non trouvée`);
};

module.exports = {
  errorMiddleware,
  notFoundMiddleware,
};