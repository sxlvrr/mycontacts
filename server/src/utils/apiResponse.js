/**
 * Réponse de succès standardisée
 */
const successResponse = (res, statusCode, message, data = null) => {
  const response = {
    success: true,
    message,
    timestamp: new Date().toISOString(),
    ...(data && { data })
  };
  
  return res.status(statusCode).json(response);
};

/**
 * Réponse d'erreur standardisée
 */
const errorResponse = (res, statusCode, message, errors = null) => {
  const response = {
    success: false,
    error: {
      code: statusCode,
      message,
      timestamp: new Date().toISOString(),
      ...(errors && { details: errors })
    }
  };
  
  return res.status(statusCode).json(response);
};

/**
 * Réponse de validation d'erreur
 */
const validationErrorResponse = (res, errors) => {
  return errorResponse(res, 400, 'Erreurs de validation', errors);
};

/**
 * Réponse d'erreur d'authentification
 */
const unauthorizedResponse = (res, message = 'Non autorisé') => {
  return errorResponse(res, 401, message);
};

/**
 * Réponse d'erreur de ressource non trouvée
 */
const notFoundResponse = (res, resource = 'Ressource') => {
  return errorResponse(res, 404, `${resource} non trouvé(e)`);
};

/**
 * Réponse d'erreur serveur
 */
const serverErrorResponse = (res, message = 'Erreur interne du serveur') => {
  return errorResponse(res, 500, message);
};

module.exports = {
  successResponse,
  errorResponse,
  validationErrorResponse,
  unauthorizedResponse,
  notFoundResponse,
  serverErrorResponse,
};