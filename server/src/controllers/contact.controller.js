const contactService = require('../services/contact.service');
const { successResponse, errorResponse, notFoundResponse } = require('../utils/apiResponse');

/**
 * Récupère tous les contacts de l'utilisateur
 */
const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactService.getAllContacts(req.user._id);
    
    if (contacts.length === 0) {
      return successResponse(res, 200, 'Aucun contact trouvé', { contacts: [] });
    }
    
    return successResponse(res, 200, `${contacts.length} contact(s) récupéré(s) avec succès`, { contacts });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

/**
 * Crée un nouveau contact
 */
const createContact = async (req, res) => {
  try {
    const contact = await contactService.createContact(req.body, req.user._id);
    return successResponse(res, 201, 'Contact créé avec succès', { contact });
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

/**
 * Met à jour un contact
 */
const updateContact = async (req, res) => {
  try {
    const contact = await contactService.updateContact(req.params.id, req.body, req.user._id);
    return successResponse(res, 200, 'Contact mis à jour avec succès', { contact });
  } catch (error) {
    if (error.message === 'Contact non trouvé') {
      return notFoundResponse(res, 'Contact');
    }
    return errorResponse(res, 400, error.message);
  }
};

/**
 * Supprime un contact
 */
const deleteContact = async (req, res) => {
  try {
    await contactService.deleteContact(req.params.id, req.user._id);
    return successResponse(res, 200, 'Contact supprimé avec succès');
  } catch (error) {
    if (error.message === 'Contact non trouvé') {
      return notFoundResponse(res, 'Contact');
    }
    return errorResponse(res, 400, error.message);
  }
};

module.exports = {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
};