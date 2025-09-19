const Contact = require('../models/Contact');

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user._id }).select('-__v');

        if (contacts.length === 0) {
            return res.status(200).json({
                message: 'Aucun contact trouvé',
                contacts: []
            });
        }

        res.status(200).json({
            message: 'Contacts récupérés avec succès',
            contacts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createContact = async (req, res) => {
    try {
      const { firstName, lastName, phone } = req.body;
      
      const contact = new Contact({
        firstName,
        lastName,
        phone,
        user: req.user._id
      });
      
      const savedContact = await contact.save();
      const contactResponse = await Contact.findById(savedContact._id).select('-__v');
      
      res.status(201).json({
        message: 'Contact créé avec succès',
        contact: contactResponse
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

exports.updateContact = async (req, res) => {
    try{
        const { id } = req.params;
        const { firstName, lastName, phone } = req.body;

        const contact = await Contact.findOne({ _id: id, user: req.user._id });
        if (!contact) {
            return res.status(404).json({ message: 'Contact non trouvé' });
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { firstName, lastName, phone },
            { new: true,
                runValidators: true
            }
        ).select('-__v');

        res.status(200).json({
            message: 'Contact mis à jour avec succès',
            contact: updatedContact
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        
        const contact = await Contact.findOne({ 
            _id: id, 
            user: req.user._id 
        });
        
        if (!contact) {
            return res.status(404).json({ 
                message: 'Contact non trouvé' 
            });
        }
        
        await Contact.findByIdAndDelete(id);
        
        res.status(200).json({
            message: 'Contact supprimé avec succès'
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};