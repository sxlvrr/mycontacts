const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user.model');
const Contact = require('../models/contact.model');

describe('Tests Contacts', () => {
  let authToken;
  let userId;

  beforeAll(async () => {
    // Connexion à la base de test
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mycontacts-test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  afterAll(async () => {
    // Nettoyage et déconnexion
    await Contact.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Nettoyer les collections
    await Contact.deleteMany({});
    await User.deleteMany({});

    // Créer un utilisateur de test et obtenir le token
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'contact-test@example.com',
        password: 'password123'
      });

    authToken = response.body.data.token;
    userId = response.body.data.user.id;
  });

  describe('POST /api/contacts', () => {
    it('devrait créer un nouveau contact avec authentification', async () => {
      const contactData = {
        firstName: 'Jean',
        lastName: 'Dupont',
        phone: '0123456789'
      };

      const response = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${authToken}`)
        .send(contactData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.contact).toHaveProperty('firstName', 'Jean');
      expect(response.body.data.contact).toHaveProperty('lastName', 'Dupont');
      expect(response.body.data.contact).toHaveProperty('phone', '0123456789');
      expect(response.body.data.contact).toHaveProperty('_id');
    });

    it('devrait rejeter une création sans authentification', async () => {
      const response = await request(app)
        .post('/api/contacts')
        .send({
          firstName: 'Jean',
          lastName: 'Dupont',
          phone: '0123456789'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('devrait rejeter des données invalides', async () => {
      const response = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          firstName: '',
          lastName: '',
          phone: '123'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/contacts', () => {
    beforeEach(async () => {
      // Créer quelques contacts de test
      await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ firstName: 'Alice', lastName: 'Martin', phone: '0111111111' });

      await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ firstName: 'Bob', lastName: 'Durand', phone: '0222222222' });
    });

    it('devrait récupérer tous les contacts de l\'utilisateur', async () => {
      const response = await request(app)
        .get('/api/contacts')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.contacts).toHaveLength(2);
      expect(response.body.data.contacts[0]).toHaveProperty('firstName');
    });

    it('devrait rejeter sans authentification', async () => {
      const response = await request(app)
        .get('/api/contacts')
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('devrait retourner une liste vide si aucun contact', async () => {
      await Contact.deleteMany({});

      const response = await request(app)
        .get('/api/contacts')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.contacts).toHaveLength(0);
    });
  });

  describe('PATCH /api/contacts/:id', () => {
    let contactId;

    beforeEach(async () => {
      const response = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ firstName: 'Original', lastName: 'Name', phone: '0123456789' });

      contactId = response.body.data.contact._id;
    });

    it('devrait mettre à jour un contact existant', async () => {
      const response = await request(app)
        .patch(`/api/contacts/${contactId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          firstName: 'Updated',
          lastName: 'Name',
          phone: '0987654321'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.contact.firstName).toBe('Updated');
      expect(response.body.data.contact.phone).toBe('0987654321');
    });

    it('devrait rejeter la mise à jour d\'un contact inexistant', async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .patch(`/api/contacts/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          firstName: 'Test',
          lastName: 'Test',
          phone: '0123456789'
        })
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/contacts/:id', () => {
    let contactId;

    beforeEach(async () => {
      const response = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ firstName: 'ToDelete', lastName: 'Contact', phone: '0123456789' });

      contactId = response.body.data.contact._id;
    });

    it('devrait supprimer un contact existant', async () => {
      const response = await request(app)
        .delete(`/api/contacts/${contactId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);

      // Vérifier que le contact n'existe plus
      const getResponse = await request(app)
        .get('/api/contacts')
        .set('Authorization', `Bearer ${authToken}`);

      expect(getResponse.body.data.contacts).toHaveLength(0);
    });

    it('devrait rejeter la suppression d\'un contact inexistant', async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .delete(`/api/contacts/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });
});
