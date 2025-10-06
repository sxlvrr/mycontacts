const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const { validateRegister, validateLogin } = require('../middlewares/validate.middleware');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email de l'utilisateur (doit être unique)
 *         password:
 *           type: string
 *           minLength: 6
 *           description: Mot de passe (minimum 6 caractères)
 *       example:
 *         email: user@example.com
 *         password: motdepasse123
 *     
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Connexion réussie"
 *         timestamp:
 *           type: string
 *           format: date-time
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: Token JWT pour l'authentification
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID unique de l'utilisateur
 *                 email:
 *                   type: string
 *                   description: Email de l'utilisateur
 *               example:
 *                 id: "507f1f77bcf86cd799439011"
 *                 email: "user@example.com"
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     description: Crée un nouveau compte utilisateur avec validation email unique et mot de passe sécurisé
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           examples:
 *             valid_user:
 *               summary: Utilisateur valide
 *               value:
 *                 email: "nouvel.utilisateur@example.com"
 *                 password: "motdepasse123"
 *             invalid_user:
 *               summary: Données invalides
 *               value:
 *                 email: "email-invalide"
 *                 password: "123"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               message: "Utilisateur créé avec succès"
 *               timestamp: "2025-09-19T12:00:00.000Z"
 *               data:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   id: "507f1f77bcf86cd799439011"
 *                   email: "nouvel.utilisateur@example.com"
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error:
 *                 code: 400
 *                 message: "Erreurs de validation"
 *                 details:
 *                   - field: "email"
 *                     message: "Format email invalide"
 *                   - field: "password"
 *                     message: "Mot de passe minimum 6 caractères"
 *       409:
 *         description: Email déjà utilisé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error:
 *                 code: 409
 *                 message: "Cet email est déjà utilisé"
 */
router.post('/register', validateRegister, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     description: Authentifie un utilisateur existant et retourne un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           examples:
 *             valid_login:
 *               summary: Connexion valide
 *               value:
 *                 email: "user@example.com"
 *                 password: "motdepasse123"
 *             invalid_login:
 *               summary: Mot de passe incorrect
 *               value:
 *                 email: "user@example.com"
 *                 password: "mauvais_mot_de_passe"
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               message: "Connexion réussie"
 *               timestamp: "2025-09-19T12:00:00.000Z"
 *               data:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   id: "507f1f77bcf86cd799439011"
 *                   email: "user@example.com"
 *       400:
 *         description: Données manquantes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error:
 *                 code: 400
 *                 message: "Erreurs de validation"
 *                 details:
 *                   - field: "email"
 *                     message: "Email requis"
 *       401:
 *         description: Email ou mot de passe incorrect
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error:
 *                 code: 401
 *                 message: "Email ou mot de passe incorrect"
 */
router.post('/login', validateLogin, login);

module.exports = router;