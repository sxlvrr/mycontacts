const Contact = require('../models/contact.model');

/**
 * Récupère tous les contacts d'un utilisateur
 */
const getAllContacts = async (userId) => {
  const contacts = await Contact.find({ user: userId }).select('-__v');
  return contacts;
};

/**
 * Crée un nouveau contact
 */
const createContact = async (contactData, userId) => {
  const { firstName, lastName, phone } = contactData;
  
  const contact = new Contact({
    firstName,
    lastName,
    phone,
    user: userId
  });
  
  const savedContact = await contact.save();
  return await Contact.findById(savedContact._id).select('-__v');
};

/**
 * Met à jour un contact
 */
const updateContact = async (contactId, contactData, userId) => {
  const { firstName, lastName, phone } = contactData;

  // Vérifier que le contact appartient à l'utilisateur
  const contact = await Contact.findOne({ _id: contactId, user: userId });
  if (!contact) {
    throw new Error('Contact non trouvé');
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { firstName, lastName, phone },
    { 
      new: true,
      runValidators: true
    }
  ).select('-__v');

  return updatedContact;
};

/**
 * Supprime un contact
 */
const deleteContact = async (contactId, userId) => {
  // Vérifier que le contact appartient à l'utilisateur
  const contact = await Contact.findOne({ 
    _id: contactId, 
    user: userId 
  });
  
  if (!contact) {
    throw new Error('Contact non trouvé');
  }
  
  await Contact.findByIdAndDelete(contactId);
  return true;
};

module.exports = {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
};