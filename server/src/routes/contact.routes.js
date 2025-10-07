const express = require('express');
const { getAllContacts, createContact, updateContact, deleteContact } = require('../controllers/contact.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateContact } = require('../middlewares/validate.middleware');

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - phone
 *       properties:
 *         _id:
 *           type: string
 *           description: ID unique du contact (généré automatiquement)
 *         firstName:
 *           type: string
 *           minLength: 1
 *           description: Prénom du contact
 *         lastName:
 *           type: string
 *           minLength: 1
 *           description: Nom du contact
 *         phone:
 *           type: string
 *           minLength: 10
 *           maxLength: 20
 *           description: Numéro de téléphone (10-20 caractères)
 *         user:
 *           type: string
 *           description: ID de l'utilisateur propriétaire
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière modification
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         firstName: "Jean"
 *         lastName: "Dupont"
 *         phone: "0123456789"
 *         user: "507f1f77bcf86cd799439012"
 *         createdAt: "2025-09-19T12:00:00.000Z"
 *         updatedAt: "2025-09-19T12:00:00.000Z"
 *     
 *     ContactInput:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - phone
 *       properties:
 *         firstName:
 *           type: string
 *           minLength: 1
 *           description: Prénom du contact
 *         lastName:
 *           type: string
 *           minLength: 1
 *           description: Nom du contact
 *         phone:
 *           type: string
 *           minLength: 10
 *           maxLength: 20
 *           description: Numéro de téléphone (10-20 caractères)
 *       example:
 *         firstName: "Jean"
 *         lastName: "Dupont"
 *         phone: "0123456789"
 *     
 *     ContactResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Contact créé avec succès"
 *         timestamp:
 *           type: string
 *           format: date-time
 *         data:
 *           type: object
 *           properties:
 *             contact:
 *               $ref: '#/components/schemas/Contact'
 *     
 *     ContactListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "5 contact(s) récupéré(s) avec succès"
 *         timestamp:
 *           type: string
 *           format: date-time
 *         data:
 *           type: object
 *           properties:
 *             contacts:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *     
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               example: 400
 *             message:
 *               type: string
 *               example: "Erreurs de validation"
 *             timestamp:
 *               type: string
 *               format: date-time
 *             details:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   field:
 *                     type: string
 *                   message:
 *                     type: string
 *                   value:
 *                     type: string
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Récupérer tous les contacts de l'utilisateur
 *     description: Retourne la liste complète des contacts appartenant à l'utilisateur authentifié
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactListResponse'
 *             examples:
 *               with_contacts:
 *                 summary: Avec des contacts
 *                 value:
 *                   success: true
 *                   message: "3 contact(s) récupéré(s) avec succès"
 *                   timestamp: "2025-09-19T12:00:00.000Z"
 *                   data:
 *                     contacts: 
 *                       - _id: "507f1f77bcf86cd799439011"
 *                         firstName: "Jean"
 *                         lastName: "Dupont"
 *                         phone: "0123456789"
 *               empty_list:
 *                 summary: Aucun contact
 *                 value:
 *                   success: true
 *                   message: "Aucun contact trouvé"
 *                   timestamp: "2025-09-19T12:00:00.000Z"
 *                   data:
 *                     contacts: []
 *       401:
 *         description: Non autorisé - Token manquant ou invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error:
 *                 code: 401
 *                 message: "Token manquant ou invalide"
 *                 timestamp: "2025-09-19T12:00:00.000Z"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', getAllContacts);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Créer un nouveau contact
 *     description: Crée un nouveau contact pour l'utilisateur authentifié avec validation des données
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *           examples:
 *             valid_contact:
 *               summary: Contact valide
 *               value:
 *                 firstName: "Marie"
 *                 lastName: "Martin"
 *                 phone: "0987654321"
 *             invalid_contact:
 *               summary: Données invalides (pour test d'erreur)
 *               value:
 *                 firstName: ""
 *                 lastName: ""
 *                 phone: "123"
 *     responses:
 *       201:
 *         description: Contact créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactResponse'
 *             example:
 *               success: true
 *               message: "Contact créé avec succès"
 *               timestamp: "2025-09-19T12:00:00.000Z"
 *               data:
 *                 contact:
 *                   _id: "507f1f77bcf86cd799439011"
 *                   firstName: "Marie"
 *                   lastName: "Martin"
 *                   phone: "0987654321"
 *                   user: "507f1f77bcf86cd799439012"
 *                   createdAt: "2025-09-19T12:00:00.000Z"
 *                   updatedAt: "2025-09-19T12:00:00.000Z"
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
 *                 timestamp: "2025-09-19T12:00:00.000Z"
 *                 details:
 *                   - field: "firstName"
 *                     message: "Prénom requis"
 *                   - field: "phone"
 *                     message: "Téléphone entre 10 et 20 caractères"
 *       401:
 *         description: Non autorisé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', validateContact, createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     summary: Mettre à jour un contact
 *     description: Met à jour les informations d'un contact existant appartenant à l'utilisateur
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: ID MongoDB du contact (24 caractères hexadécimaux)
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *           examples:
 *             update_contact:
 *               summary: Mise à jour du contact
 *               value:
 *                 firstName: "Jean-Michel"
 *                 lastName: "Dupont-Martin"
 *                 phone: "0612345678"
 *     responses:
 *       200:
 *         description: Contact mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactResponse'
 *             example:
 *               success: true
 *               message: "Contact mis à jour avec succès"
 *               timestamp: "2025-09-19T12:00:00.000Z"
 *               data:
 *                 contact:
 *                   _id: "507f1f77bcf86cd799439011"
 *                   firstName: "Jean-Michel"
 *                   lastName: "Dupont-Martin"
 *                   phone: "0612345678"
 *                   user: "507f1f77bcf86cd799439012"
 *                   updatedAt: "2025-09-19T12:30:00.000Z"
 *       400:
 *         description: Données invalides ou ID malformé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error:
 *                 code: 400
 *                 message: "ID invalide: abc123"
 *                 timestamp: "2025-09-19T12:00:00.000Z"
 *       404:
 *         description: Contact non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error:
 *                 code: 404
 *                 message: "Contact non trouvé"
 *                 timestamp: "2025-09-19T12:00:00.000Z"
 *       401:
 *         description: Non autorisé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch('/:id', validateContact, updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Supprimer un contact
 *     description: Supprime définitivement un contact appartenant à l'utilisateur authentifié
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: ID MongoDB du contact (24 caractères hexadécimaux)
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Contact supprimé avec succès"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *             example:
 *               success: true
 *               message: "Contact supprimé avec succès"
 *               timestamp: "2025-09-19T12:00:00.000Z"
 *       400:
 *         description: ID invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Contact non trouvé ou n'appartient pas à l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Non autorisé - Token manquant ou invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', deleteContact);

module.exports = router;