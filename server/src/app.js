const express = require("express");
require("dotenv").config();

// Imports de configuration
const corsMiddleware = require("./config/cors");
const connectDatabase = require("./config/db");
const { swaggerUi, specs } = require("./config/swagger");

// Imports de middlewares
const authMiddleware = require("./middlewares/auth.middleware");
const { errorMiddleware, notFoundMiddleware } = require("./middlewares/error.middleware");

// Import des routes
const routes = require("./routes");

// Utilitaires
const { successResponse } = require("./utils/apiResponse");

const app = express();

// Middlewares globaux
app.use(corsMiddleware);
app.use(express.json());

// Connexion à la base de données
connectDatabase();

// Documentation Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes principales
app.use("/api", routes);

// Route de test protégée
app.get("/api/profile", authMiddleware, (req, res) => {
  return successResponse(res, 200, "Profil utilisateur", {
    user: {
      id: req.user._id,
      email: req.user.email
    }
  });
});

// Middleware pour routes non trouvées
app.use(notFoundMiddleware);

// Middleware de gestion d'erreurs (doit être en dernier)
app.use(errorMiddleware);

module.exports = app;
