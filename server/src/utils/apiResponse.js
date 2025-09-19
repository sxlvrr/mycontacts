/**
 * Réponse de succès standardisée
 */
const successResponse = (res, statusCode, message, data = null) => {
  const response = {
    success: true,
    message,
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
    message,
    ...(errors && { errors })
  };
  
  return res.status(statusCode).json(response);
};

/**
 * Réponse de validation d'erreur
 */
const validationErrorResponse = (res, errors) => {
  return errorResponse(res, 400, 'Erreurs de validation', errors);
};

module.exports = {
  successResponse,
  errorResponse,
  validationErrorResponse,
};