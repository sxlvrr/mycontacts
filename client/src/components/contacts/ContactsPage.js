import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { contactService } from '../../services/contactService';
import './Contacts.css';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });
  const { user, logout } = useAuth();

  // Charger les contacts au démarrage
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const response = await contactService.getAll();
      if (response.success) {
        setContacts(response.data.contacts);
      }
    } catch (err) {
      setError(err.error?.message || 'Erreur lors du chargement des contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  // Gérer l'ajout d'un nouveau contact
  const handleAddContact = () => {
    setEditingContact(null);
    setFormData({ firstName: '', lastName: '', phone: '' });
    setShowForm(true);
  };

  // Gérer l'édition d'un contact
  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setFormData({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone
    });
    setShowForm(true);
  };

  // Gérer la suppression d'un contact
  const handleDeleteContact = async (contactId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      try {
        const response = await contactService.delete(contactId);
        if (response.success) {
          setContacts(contacts.filter(contact => contact._id !== contactId));
        }
      } catch (err) {
        setError(err.error?.message || 'Erreur lors de la suppression');
      }
    }
  };

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Soumettre le formulaire
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (editingContact) {
        // Mise à jour
        const response = await contactService.update(editingContact._id, formData);
        if (response.success) {
          setContacts(contacts.map(contact => 
            contact._id === editingContact._id ? response.data.contact : contact
          ));
        }
      } else {
        // Création
        const response = await contactService.create(formData);
        if (response.success) {
          setContacts([...contacts, response.data.contact]);
        }
      }
      setShowForm(false);
      setFormData({ firstName: '', lastName: '', phone: '' });
      setEditingContact(null);
    } catch (err) {
      setError(err.error?.message || 'Erreur lors de la sauvegarde');
    }
  };

  // Annuler le formulaire
  const handleCancelForm = () => {
    setShowForm(false);
    setFormData({ firstName: '', lastName: '', phone: '' });
    setEditingContact(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader">Chargement des contacts...</div>
      </div>
    );
  }

  return (
    <div className="contacts-page">
      <header className="contacts-header">
        <div className="header-content">
          <h1>📱 MyContacts</h1>
          <div className="user-info">
            <span>Bienvenue, {user?.email}</span>
            <button onClick={handleLogout} className="logout-btn">
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="contacts-main">
        <div className="contacts-container">
          <div className="contacts-actions">
            <h2>Mes Contacts ({contacts.length})</h2>
            <button onClick={handleAddContact} className="add-btn">➕ Ajouter un contact</button>
          </div>

          {error && (
            <div className="error-message">
              ❌ {error}
              <button onClick={() => setError(null)}>✕</button>
            </div>
          )}

          {contacts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📪</div>
              <h3>Aucun contact trouvé</h3>
              <p>Ajoutez votre premier contact pour commencer !</p>
            </div>
          ) : (
            <div className="contacts-grid">
              {contacts.map(contact => (
                <div key={contact._id} className="contact-card">
                  <div className="contact-avatar">
                    {contact.firstName[0]}{contact.lastName[0]}
                  </div>
                  <div className="contact-info">
                    <h3>{contact.firstName} {contact.lastName}</h3>
                    <p>📞 {contact.phone}</p>
                  </div>
                  <div className="contact-actions">
                    <button onClick={() => handleEditContact(contact)} className="edit-btn">✏️</button>
                    <button onClick={() => handleDeleteContact(contact._id)} className="delete-btn">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal de formulaire */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingContact ? '✏️ Modifier le contact' : '➕ Ajouter un contact'}</h3>
              <button onClick={handleCancelForm} className="close-btn">✕</button>
            </div>
            
            <form onSubmit={handleSubmitForm} className="contact-form">
              <div className="form-group">
                <label htmlFor="firstName">Prénom *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder="Entrez le prénom"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Nom *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  placeholder="Entrez le nom"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Téléphone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: 06 12 34 56 78"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={handleCancelForm} className="cancel-btn">
                  Annuler
                </button>
                <button type="submit" className="save-btn">
                  {editingContact ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;