# 🎓 Guide de Soutenance - MyContacts

## 📋 Points Clés à Présenter

### 1. Architecture Générale (3 min)

**Schéma à dessiner :**
```
┌─────────────┐         HTTP/JSON + JWT         ┌──────────────┐
│   REACT     │ ◄────────────────────────────► │   EXPRESS    │
│  (Client)   │                                 │   (Server)   │
└─────────────┘                                 └──────┬───────┘
                                                       │
                                                       ▼
                                                ┌──────────────┐
                                                │   MongoDB    │
                                                └──────────────┘
```

**Points à mentionner :**
- Architecture Full-Stack découplée (client/serveur séparés)
- Communication via API REST
- Authentification JWT (stateless)
- Base de données NoSQL MongoDB

---

### 2. Authentification JWT (4 min)

**Flux d'authentification à expliquer :**

1. **Inscription** :
   - User envoie email + password → backend
   - Hashage bcrypt du password (coût 10)
   - Stockage en base
   - Génération token JWT
   - Retour token au client

2. **Connexion** :
   - User envoie email + password
   - Vérification avec `bcrypt.compare()`
   - Si valide → génération JWT
   - Stockage token dans localStorage

3. **Requêtes protégées** :
   - Toute requête inclut `Authorization: Bearer <token>`
   - Middleware `auth.middleware.js` vérifie et décode le token
   - Attache `req.user` pour accès dans les controllers

**Fichiers concernés :**
- `server/src/middlewares/auth.middleware.js`
- `server/src/services/auth.service.js`
- `server/src/services/token.service.js`
- `client/src/contexts/AuthContext.js`

**Code à montrer (auth.middleware.js) :**
```javascript
const token = req.headers.authorization?.split(' ')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.userId);
```

---

### 3. Architecture MVC Backend (5 min)

**Expliquer la séparation des responsabilités :**

```
Routes → Middlewares → Controllers → Services → Models → DB
```

**Exemple concret : Créer un contact**

1. **Route** (`contact.routes.js`) :
   ```javascript
   router.post('/', validateContact, createContact);
   ```
   - Définit l'endpoint
   - Applique middleware de validation

2. **Controller** (`contact.controller.js`) :
   ```javascript
   const createContact = async (req, res) => {
     const contact = await contactService.createContact(req.body, req.user._id);
     return successResponse(res, 201, 'Contact créé', { contact });
   };
   ```
   - Reçoit la requête HTTP
   - Appelle le service
   - Formate la réponse

3. **Service** (`contact.service.js`) :
   ```javascript
   const createContact = async (contactData, userId) => {
     const contact = new Contact({ ...contactData, user: userId });
     return await contact.save();
   };
   ```
   - Logique métier pure
   - Interaction avec le modèle

4. **Model** (`contact.model.js`) :
   ```javascript
   const contactSchema = new mongoose.Schema({
     firstName: { type: String, required: true },
     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
   });
   ```
   - Définit la structure des données

**Avantages à mentionner :**
- Testabilité (services testables sans HTTP)
- Maintenabilité (chaque couche a une responsabilité)
- Réutilisabilité (services appelables depuis plusieurs controllers)

---

### 4. Sécurité (3 min)

**Mesures implémentées :**

1. **Hashage des mots de passe** :
   - bcrypt avec coût 10
   - Jamais de password en clair en base

2. **JWT sécurisé** :
   - Secret long (JWT_SECRET)
   - Expiration 7 jours
   - Vérifié à chaque requête protégée

3. **Validation des données** :
   - Côté client (UX)
   - Côté serveur (sécurité réelle)
   - Middleware `validate.middleware.js`

4. **Isolation des données** :
   - Chaque query filtre par `user: userId`
   - Impossible d'accéder aux contacts d'un autre user

5. **CORS configuré** :
   - Seul le frontend autorisé peut faire des requêtes

**Code à montrer (isolation) :**
```javascript
// Dans contact.service.js
const contact = await Contact.findOne({ 
  _id: contactId, 
  user: userId  // ← Empêche l'accès aux contacts d'autres users
});
```

---

### 5. Tests Unitaires (3 min)

**Montrer la couverture :**
```bash
npm test
```

**Expliquer les tests :**
- **Auth tests** : register, login, validation
- **Contact tests** : CRUD complet, isolation des données

**Exemple de test à montrer (contacts.test.js) :**
```javascript
it('devrait rejeter l\'accès aux contacts d\'un autre utilisateur', async () => {
  // Créer 2 users
  const user1Token = ...;
  const user2Token = ...;
  
  // User1 crée un contact
  const contact = await createContact(user1Token, data);
  
  // User2 tente d'y accéder
  const response = await request(app)
    .patch(`/contacts/${contact._id}`)
    .set('Authorization', `Bearer ${user2Token}`)
    .expect(404); // Contact not found (isolation)
});
```

---

### 6. Frontend React (4 min)

**Architecture composants :**
```
App.js (Router)
├─ Login / Register (pages publiques)
└─ ProtectedRoute
   └─ ContactsPage (page protégée)
```

**Context API pour l'auth :**
- `AuthContext.js` : état global (user, login, logout)
- Accessible partout via `useAuth()`

**Services API :**
- `api.js` : instance Axios avec intercepteurs
  - Request : ajoute le token automatiquement
  - Response : redirige vers /login si 401

**Code à montrer (intercepteur) :**
```javascript
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

### 7. Documentation Swagger (2 min)

**Montrer en live :**
- Ouvrir `http://localhost:5000/api-docs`
- Tester un endpoint (ex: POST /auth/register)
- Montrer les schémas de données

**Avantages :**
- Documentation toujours à jour (générée depuis le code)
- Tests interactifs
- Contrat d'API clair pour le frontend

---

### 8. Démo Live (5 min)

**Scénario à suivre :**

1. **Inscription** :
   - Ouvrir DevTools → Network
   - S'inscrire avec un nouvel email
   - Montrer la requête POST `/auth/register`
   - Montrer le token JWT dans la réponse

2. **Ajout de contact** :
   - Cliquer "Ajouter un contact"
   - Remplir le formulaire
   - Montrer la requête POST `/contacts` avec le token

3. **Édition** :
   - Modifier un contact
   - Montrer la requête PATCH `/contacts/:id`

4. **Isolation des données** :
   - Ouvrir une fenêtre privée
   - Se connecter avec un autre compte
   - Montrer que les contacts sont différents

5. **Sécurité** :
   - Supprimer le token du localStorage
   - Tenter d'accéder `/contacts` → redirection vers login

---

## 🎯 Questions Fréquentes

### Q1 : Pourquoi utiliser JWT plutôt que des sessions ?
**Réponse :**
- JWT = stateless (pas besoin de stocker les sessions côté serveur)
- Scalable (plusieurs serveurs peuvent vérifier le token indépendamment)
- Idéal pour les API REST

### Q2 : Comment gérer l'expiration du token ?
**Réponse :**
- Token expire après 7 jours (configurable)
- Si expiré, backend renvoie 401
- Intercepteur Axios détecte le 401 et redirige vers login
- User doit se reconnecter

### Q3 : Pourquoi séparer controllers et services ?
**Réponse :**
- **Controllers** : gèrent HTTP (req/res, status codes)
- **Services** : logique métier pure (testable sans HTTP)
- Permet de réutiliser les services (ex: appel depuis un script CLI)

### Q4 : Comment empêcher un user d'accéder aux contacts d'un autre ?
**Réponse :**
- Toutes les queries filtrent par `user: userId`
- Le userId vient du token JWT décodé (non modifiable par le client)
- Même si le client envoie un mauvais ID de contact, le filtre `user` empêche l'accès

### Q5 : Différence entre PUT et PATCH ?
**Réponse :**
- **PUT** : remplacement complet de la ressource
- **PATCH** : modification partielle (seulement les champs fournis)
- J'ai utilisé PATCH car on met à jour seulement certains champs

---

## 📊 Métriques à Mentionner

- **Lignes de code** : ~3500
- **Tests** : 20+ tests unitaires
- **Couverture** : > 70%
- **Endpoints** : 7 API endpoints
- **Technologies** : 10+ librairies majeures

---

## 💡 Points Forts du Projet

1. ✅ Architecture professionnelle (MVC)
2. ✅ Sécurité robuste (JWT, bcrypt, validation)
3. ✅ Tests unitaires avec bonne couverture
4. ✅ Documentation Swagger complète
5. ✅ Code propre et maintenable
6. ✅ Gestion d'erreurs centralisée
7. ✅ Déployable facilement (Render + Netlify)

---

## 🚀 Améliorations Possibles (si on vous demande)

- Refresh tokens (renouvellement auto du JWT)
- Pagination des contacts (pour grandes listes)
- Recherche/filtrage de contacts
- Avatar des contacts (upload d'image)
- Export CSV des contacts
- Tests E2E avec Cypress
- CI/CD avec GitHub Actions
- Rate limiting (protection anti-spam)

---

**Bonne chance pour la soutenance ! 🎉**
