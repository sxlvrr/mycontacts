const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { swaggerUi, specs } = require("./utils/swagger");
const requireAuth = require("./middleware/auth");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error("Erreur MongoDB:", err));

// Documentation Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/contacts", require("./routes/contacts"));

// Route de test protégée
app.get("/profile", requireAuth, (req, res) => {
  res.json({
    message: "Profil utilisateur",
    user: req.user,
  });
});

// Route de base
app.get("/", (req, res) => {
  res.json({
    message: "API MyContacts - Jour 1",
    documentation: "/api-docs",
  });
});

module.exports = app;
