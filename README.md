# 📱 MyContacts - Application Full-Stack de Gestion de Contacts

> Application moderne de gestion de contacts développée avec React, Node.js, Express et MongoDB. Intègre une authentification JWT sécurisée et une architecture MVC professionnelle.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-green.svg)](https://www.mongodb.com/)

---

## 📋 **Table des Matières**

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Tests](#tests)
- [API Documentation](#api-documentation)
- [Déploiement](#déploiement)
- [Identifiants de Test](#identifiants-de-test)
- [Auteur](#auteur)

---

## 🎯 **Aperçu**

MyContacts est une application full-stack permettant de gérer ses contacts personnels de manière sécurisée. Chaque utilisateur dispose de son propre espace protégé par authentification JWT.

### Captures d'écran

**Page de connexion**
![Login Page](./docs/screenshots/login.png)

**Liste de contacts**
![Contacts Page](./docs/screenshots/contacts.png)

---

## ✨ **Fonctionnalités**

### Authentification
- ✅ Inscription avec validation email unique
- ✅ Connexion sécurisée avec JWT
- ✅ Hashage des mots de passe avec bcrypt
- ✅ Protection des routes côté frontend et backend
- ✅ Déconnexion automatique en cas de token expiré

### Gestion des Contacts
- ✅ Affichage de la liste des contacts personnels
- ✅ Ajout d'un nouveau contact (formulaire modal)
- ✅ Modification d'un contact existant
- ✅ Suppression avec confirmation
- ✅ Isolation des données par utilisateur

### Qualité & Documentation
- ✅ Tests unitaires Jest avec couverture > 70%
- ✅ Documentation API Swagger/OpenAPI
- ✅ Architecture MVC professionnelle
- ✅ Validation des données (côté client et serveur)
- ✅ Gestion d'erreurs centralisée
- ✅ Réponses API standardisées

---

## 🛠️ **Technologies**

### Frontend
- **React 19** - Framework UI
- **React Router 7** - Routing SPA
- **Axios** - Client HTTP
- **Context API** - Gestion d'état global

### Backend
- **Node.js 18+** - Runtime JavaScript
- **Express 5** - Framework web
- **MongoDB & Mongoose** - Base de données NoSQL
- **JWT (jsonwebtoken)** - Authentification
- **bcryptjs** - Hashage de mots de passe
- **Swagger** - Documentation API

### DevOps & Tests
- **Jest** - Tests unitaires
- **Supertest** - Tests d'API
- **Nodemon** - Hot reload serveur
- **Concurrently** - Lancement parallèle client/serveur

---

## 🏗️ **Architecture**

```
mycontacts-final/
│
├── client/                     # Application React (Frontend)
│   ├── public/                 # Fichiers statiques
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/           # Login, Register
│   │   │   ├── common/         # ProtectedRoute
│   │   │   └── contacts/       # ContactsPage
│   │   ├── contexts/           # AuthContext (gestion auth globale)
│   │   ├── services/           # API calls (authService, contactService)
│   │   ├── App.js              # Routing principal
│   │   └── index.js            # Point d'entrée React
│   └── package.json
│
├── server/                     # API Node.js/Express (Backend)
│   ├── src/
│   │   ├── config/             # Configuration (DB, CORS, Swagger)
│   │   ├── controllers/        # Gestion des requêtes HTTP
│   │   ├── middlewares/        # Auth, validation, erreurs
│   │   ├── models/             # Schémas Mongoose (User, Contact)
│   │   ├── routes/             # Définition des endpoints
│   │   ├── services/           # Logique métier
│   │   ├── utils/              # Utilitaires (apiResponse)
│   │   ├── tests/              # Tests unitaires Jest
│   │   ├── app.js              # Configuration Express
│   │   └── server.js           # Démarrage serveur
│   ├── jest.config.js          # Configuration tests
│   └── package.json
│
├── package.json                # Scripts racine (install-all, dev)
└── README.md                   # Documentation (ce fichier)
```

### Flux de données

```
┌─────────────────────────────────────────────────────────┐
│                   CLIENT (React)                         │
│  Browser → React Router → Context API → Axios Services  │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP + JWT Token
                         ↓
┌─────────────────────────────────────────────────────────┐
│                   SERVER (Express)                       │
│  Routes → Auth Middleware → Controllers → Services      │
│                         ↓                                │
│                  MongoDB (Mongoose)                      │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 **Installation**

### Prérequis
- **Node.js** >= 18.x
- **npm** >= 9.x
- **MongoDB** (local ou Atlas)
- **Git**

### Étapes d'installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/sxlvrr/mycontacts.git
cd mycontacts

# 2. Installer les dépendances (client + serveur)
npm run install-all

# Alternative : installation manuelle
npm run install-server
npm run install-client
```

---

## ⚙️ **Configuration**

### 1. Variables d'environnement Backend

Créer un fichier `.env` dans le dossier `server/` :

```env
# Base de données MongoDB
MONGODB_URI=mongodb://localhost:27017/mycontacts
# OU MongoDB Atlas
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/mycontacts

# Port du serveur
PORT=5000

# Secret JWT (générer une chaîne aléatoire sécurisée)
JWT_SECRET=votre_secret_jwt_super_securise_a_changer

# URL du frontend (pour CORS)
FRONTEND_URL=http://localhost:3000
```

### 2. Variables d'environnement Frontend

Créer un fichier `.env` dans le dossier `client/` :

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📦 **Utilisation**

### Démarrage en développement

#### Option 1 : Lancement simultané (recommandé)
```bash
# Depuis la racine du projet
npm run dev
```
Démarre simultanément :
- Backend sur `http://localhost:5000`
- Frontend sur `http://localhost:3000`

#### Option 2 : Lancement séparé

**Terminal 1 - Backend :**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend :**
```bash
cd client
npm start
```

### Accès à l'application

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:5000/api
- **Documentation Swagger** : http://localhost:5000/api-docs

---

## 🧪 **Tests**

### Backend (Jest + Supertest)

```bash
cd server

# Exécuter tous les tests
npm test

# Tests avec couverture
npm run test -- --coverage

# Mode watch
npm run test -- --watch
```

### Couverture des tests
- ✅ Authentification (register, login, validation)
- ✅ Contacts CRUD (create, read, update, delete)
- ✅ Middlewares (auth, validation)
- ✅ Isolation des données utilisateurs

**Seuils de couverture :**
- Branches : 60%
- Fonctions : 70%
- Lignes : 70%
- Statements : 70%

---

## 📚 **API Documentation**

### Documentation Swagger Interactive

Accédez à la documentation complète sur :
👉 **http://localhost:5000/api-docs**

### Endpoints principaux

#### Authentification
| Méthode | Endpoint           | Description              | Auth requise |
|---------|--------------------|--------------------------|--------------|
| POST    | `/api/auth/register` | Inscription utilisateur  | Non          |
| POST    | `/api/auth/login`    | Connexion utilisateur    | Non          |

#### Contacts
| Méthode | Endpoint              | Description                    | Auth requise |
|---------|-----------------------|--------------------------------|--------------|
| GET     | `/api/contacts`       | Récupérer tous les contacts    | Oui          |
| POST    | `/api/contacts`       | Créer un nouveau contact       | Oui          |
| PATCH   | `/api/contacts/:id`   | Modifier un contact            | Oui          |
| DELETE  | `/api/contacts/:id`   | Supprimer un contact           | Oui          |

### Exemples de requêtes

#### Register
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "motdepasse123"
}
```

**Réponse :**
```json
{
  "success": true,
  "message": "Utilisateur créé avec succès",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com"
    }
  }
}
```

#### Créer un contact
```bash
POST http://localhost:5000/api/contacts
Authorization: Bearer <votre_token_jwt>
Content-Type: application/json

{
  "firstName": "Jean",
  "lastName": "Dupont",
  "phone": "0123456789"
}
```

---

## 🌐 **Déploiement**

### Backend (Render, Heroku, Railway)

#### Render.com (Recommandé)

1. **Créer un nouveau Web Service**
2. **Configurer :**
   - Build Command : `cd server && npm install`
   - Start Command : `cd server && npm start`
3. **Variables d'environnement :**
   ```
   MONGODB_URI=<votre_uri_mongodb_atlas>
   JWT_SECRET=<secret_securise>
   FRONTEND_URL=<url_frontend_deployé>
   PORT=5000
   ```

### Frontend (Netlify, Vercel)

#### Netlify (Recommandé)

1. **Configurer le build :**
   - Base directory : `client`
   - Build command : `npm run build`
   - Publish directory : `client/build`

2. **Variable d'environnement :**
   ```
   REACT_APP_API_URL=<url_backend_deployé>/api
   ```

#### Fichier `client/_redirects` (pour React Router)
```
/*    /index.html   200
```

---

## 🔑 **Identifiants de Test**

Pour tester rapidement l'application, utilisez ces identifiants (créés automatiquement en dev) :

```
Email    : demo@mycontacts.com
Password : Demo123456
```

**OU** créez un nouveau compte via la page d'inscription.

### Contacts de démonstration
Après connexion avec le compte demo, vous aurez accès à des contacts pré-remplis :
- Alice Martin - 0612345678
- Bob Durand - 0687654321
- Claire Dubois - 0698765432

---

## 🎓 **Concepts Techniques Clés**

### Architecture MVC
- **Models** : Schémas Mongoose (structure des données)
- **Controllers** : Gestion des requêtes HTTP (req/res)
- **Services** : Logique métier pure (réutilisable)
- **Routes** : Définition des endpoints et middlewares

### Sécurité
- **JWT** : Authentification stateless (pas de sessions serveur)
- **bcrypt** : Hash des mots de passe (coût 10)
- **CORS** : Protection cross-origin configurée
- **Validation** : Données validées côté client ET serveur
- **Isolation** : Chaque utilisateur n'accède qu'à ses propres contacts

### Bonnes Pratiques
- ✅ Séparation des responsabilités (Single Responsibility Principle)
- ✅ Gestion d'erreurs centralisée
- ✅ Réponses API standardisées
- ✅ Tests unitaires avec couverture
- ✅ Documentation Swagger
- ✅ Variables d'environnement pour la config
- ✅ `.gitignore` pour éviter les secrets en version control

---

## 📝 **Scripts Disponibles**

### Racine du projet
```bash
npm run dev              # Lancer client + serveur en parallèle
npm run server           # Lancer uniquement le serveur
npm run client           # Lancer uniquement le client
npm run install-all      # Installer toutes les dépendances
```

### Backend (`server/`)
```bash
npm start                # Démarrer le serveur (production)
npm run dev              # Mode développement (nodemon)
npm test                 # Exécuter les tests Jest
```

### Frontend (`client/`)
```bash
npm start                # Démarrer en mode développement
npm run build            # Build de production
npm test                 # Tests React Testing Library
```

---

## 🐛 **Dépannage**

### Erreur de connexion MongoDB
- Vérifiez que MongoDB est lancé (local) ou que l'URI Atlas est correct
- Vérifiez les règles réseau dans MongoDB Atlas (IP whitelisting)

### Erreur CORS
- Vérifiez que `FRONTEND_URL` dans `.env` backend correspond à l'URL du client
- En local : `http://localhost:3000` (pas de trailing slash)

### Token expiré
- Le token JWT expire après 7 jours par défaut
- Déconnectez-vous et reconnectez-vous

### Port déjà utilisé
```bash
# Windows : libérer le port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

---

## 📄 **Licence**

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👤 **Auteur**

**Mathis**
- GitHub : [@sxlvrr](https://github.com/sxlvrr)
- Email : contact@mathis.dev

---

## 🙏 **Remerciements**

- EFREI Paris - Formation développement web
- Prof. Wassini Bouzidi - Encadrement du projet
- Communauté React & Node.js

---

## 📊 **Statistiques du Projet**

- **Lignes de code** : ~3500 lignes
- **Tests unitaires** : 20+ tests
- **Couverture** : > 70%
- **Endpoints API** : 7 endpoints
- **Temps de développement** : 4 jours

---

**Dernière mise à jour** : Octobre 2025

🚀 **Bonne utilisation de MyContacts !**
