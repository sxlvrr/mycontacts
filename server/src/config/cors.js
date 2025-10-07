const cors = require("cors");

const corsOptions = {
  origin: [
    "http://localhost:3000", // React dev server
    "http://localhost:3001", // React alternative port
    process.env.FRONTEND_URL || "http://localhost:3000",
    // Autoriser toutes les URLs Netlify (format: https://*.netlify.app)
    /https:\/\/.*\.netlify\.app$/
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = cors(corsOptions);