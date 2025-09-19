const express = require('express');
const { getAllContacts, createContact, updateContact, deleteContact } = require('../controllers/contact.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateContact } = require('../middlewares/validate.middleware');

const router = express.Router();

// Appliquer l'authentification à toutes les routes
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
 *         firstName:
 *           type: string
 *           description: Prénom du contact
 *         lastName:
 *           type: string
 *           description: Nom du contact
 *         phone:
 *           type: string
 *           description: Numéro de téléphone
 *       example:
 *         firstName: Jean
 *         lastName: Dupont
 *         phone: "0123456789"
 *     ContactResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             contacts:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Récupérer tous les contacts de l'utilisateur
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactResponse'
 */
router.get('/', getAllContacts);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Créer un nouveau contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact créé avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post('/', validateContact, createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     summary: Mettre à jour un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Contact mis à jour
 *       404:
 *         description: Contact non trouvé
 */
router.patch('/:id', validateContact, updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Supprimer un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès
 *       404:
 *         description: Contact non trouvé
 */
router.delete('/:id', deleteContact);

module.exports = router;