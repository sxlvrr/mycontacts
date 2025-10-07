# MyContacts# MyContacts - Gestionnaire de Contacts Full-Stack# 📱 MyContacts - Application Full-Stack de Gestion de Contacts



Application de gestion de contacts avec authentification JWT.



---Application de gestion de contacts avec authentification JWT, développée avec React, Node.js, Express et MongoDB.> Application moderne de gestion de contacts développée avec React, Node.js, Express et MongoDB. Intègre une authentification JWT sécurisée et une architecture MVC professionnelle.



## 🌐 Déploiement en Ligne



- **Application** : https://mycontactsmb.netlify.app/---[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

- **API** : https://mycontacts-k14l.onrender.com

- **Documentation Swagger** : https://mycontacts-k14l.onrender.com/api-docs[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)



---## 🚀 Déploiement en Ligne[![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://reactjs.org/)



## ⚡ Setup Local[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-green.svg)](https://www.mongodb.com/)



```bash- **Frontend (Netlify)** : [Votre URL Netlify à ajouter]

# 1. Cloner le projet

git clone https://github.com/sxlvrr/mycontacts.git- **Backend (Render)** : https://mycontacts-k14l.onrender.com---

cd mycontacts

- **Documentation API (Swagger)** : https://mycontacts-k14l.onrender.com/api-docs

# 2. Installer les dépendances

npm run install-all## 📋 **Table des Matières**



# 3. Configurer l'environnement---

# server/.env

MONGODB_URI=mongodb://localhost:27017/mycontacts- [Aperçu](#aperçu)

PORT=5000

JWT_SECRET=votre_secret## ⚡ Installation Rapide- [Fonctionnalités](#fonctionnalités)

FRONTEND_URL=http://localhost:3000

- [Technologies](#technologies)

# client/.env

REACT_APP_API_URL=http://localhost:5000/api### Prérequis- [Architecture](#architecture)



# 4. Lancer l'application- Node.js >= 18- [Installation](#installation)

npm run dev

```- MongoDB (local ou Atlas)- [Configuration](#configuration)



---- [Utilisation](#utilisation)



## 📋 Scripts### Setup- [Tests](#tests)



```bash- [API Documentation](#api-documentation)

npm run dev              # Lancer frontend + backend

npm run server           # Backend uniquement```bash- [Déploiement](#déploiement)

npm run client           # Frontend uniquement

npm run install-all      # Installer dépendances# 1. Cloner le projet- [Identifiants de Test](#identifiants-de-test)

```

git clone https://github.com/sxlvrr/mycontacts.git- [Auteur](#auteur)

---

cd mycontacts

## 🔑 Identifiants de Test

---

```

Email    : demo@mycontacts.com# 2. Installer toutes les dépendances

Password : Demo123456

```npm run install-all## 🎯 **Aperçu**



---



## 📡 Endpoints API# 3. Configuration Backend - créer server/.envMyContacts est une application full-stack permettant de gérer ses contacts personnels de manière sécurisée. Chaque utilisateur dispose de son propre espace protégé par authentification JWT.



### AuthentificationMONGODB_URI=mongodb://localhost:27017/mycontacts



| Méthode | Endpoint | Description |PORT=5000### Captures d'écran

|---------|----------|-------------|

| POST | `/api/auth/register` | Inscription |JWT_SECRET=votre_secret_securise

| POST | `/api/auth/login` | Connexion |

FRONTEND_URL=http://localhost:3000**Page de connexion**

### Contacts (authentification requise)

![Login Page](./docs/screenshots/login.png)

| Méthode | Endpoint | Description |

|---------|----------|-------------|# 4. Configuration Frontend - créer client/.env

| GET | `/api/contacts` | Liste des contacts |

| POST | `/api/contacts` | Créer un contact |REACT_APP_API_URL=http://localhost:5000/api**Liste de contacts**

| PATCH | `/api/contacts/:id` | Modifier un contact |

| DELETE | `/api/contacts/:id` | Supprimer un contact |![Contacts Page](./docs/screenshots/contacts.png)



---# 5. Lancer l'application



**Auteur** : Mathis Bodelot | **Licence** : MITnpm run dev---


```

## ✨ **Fonctionnalités**

L'application démarre sur :

- Frontend : http://localhost:3000### Authentification

- Backend : http://localhost:5000- ✅ Inscription avec validation email unique

- Swagger : http://localhost:5000/api-docs- ✅ Connexion sécurisée avec JWT

- ✅ Hashage des mots de passe avec bcrypt

---- ✅ Protection des routes côté frontend et backend

- ✅ Déconnexion automatique en cas de token expiré

## 📋 Scripts Disponibles

### Gestion des Contacts

```bash- ✅ Affichage de la liste des contacts personnels

npm run dev              # Lancer frontend + backend- ✅ Ajout d'un nouveau contact (formulaire modal)

npm run server           # Backend uniquement- ✅ Modification d'un contact existant

npm run client           # Frontend uniquement- ✅ Suppression avec confirmation

npm run install-all      # Installer toutes les dépendances- ✅ Isolation des données par utilisateur

cd server && npm test    # Tests backend

```### Qualité & Documentation

- ✅ Tests unitaires Jest avec couverture > 70%

---- ✅ Documentation API Swagger/OpenAPI

- ✅ Architecture MVC professionnelle

## 🔑 Identifiants de Test- ✅ Validation des données (côté client et serveur)

- ✅ Gestion d'erreurs centralisée

Pour tester rapidement l'application :- ✅ Réponses API standardisées



```---

Email    : demo@mycontacts.com

Password : Demo123456## 🛠️ **Technologies**

```

### Frontend

Ou créez un nouveau compte via l'inscription.- **React 19** - Framework UI

- **React Router 7** - Routing SPA

---- **Axios** - Client HTTP

- **Context API** - Gestion d'état global

## 📡 Endpoints API

### Backend

### Authentification- **Node.js 18+** - Runtime JavaScript

- **Express 5** - Framework web

| Méthode | Endpoint | Description |- **MongoDB & Mongoose** - Base de données NoSQL

|---------|----------|-------------|- **JWT (jsonwebtoken)** - Authentification

| POST | `/api/auth/register` | Inscription |- **bcryptjs** - Hashage de mots de passe

| POST | `/api/auth/login` | Connexion |- **Swagger** - Documentation API



### Contacts (authentification requise)### DevOps & Tests

- **Jest** - Tests unitaires

| Méthode | Endpoint | Description |- **Supertest** - Tests d'API

|---------|----------|-------------|- **Nodemon** - Hot reload serveur

| GET | `/api/contacts` | Liste des contacts |- **Concurrently** - Lancement parallèle client/serveur

| POST | `/api/contacts` | Créer un contact |

| PATCH | `/api/contacts/:id` | Modifier un contact |---

| DELETE | `/api/contacts/:id` | Supprimer un contact |

## 🏗️ **Architecture**

### Exemple de requête

```

```bashmycontacts-final/

# Inscription│

POST http://localhost:5000/api/auth/register├── client/                     # Application React (Frontend)

Content-Type: application/json│   ├── public/                 # Fichiers statiques

│   ├── src/

{│   │   ├── components/

  "email": "user@example.com",│   │   │   ├── auth/           # Login, Register

  "password": "motdepasse123"│   │   │   ├── common/         # ProtectedRoute

}│   │   │   └── contacts/       # ContactsPage

│   │   ├── contexts/           # AuthContext (gestion auth globale)

# Créer un contact (avec token JWT)│   │   ├── services/           # API calls (authService, contactService)

POST http://localhost:5000/api/contacts│   │   ├── App.js              # Routing principal

Authorization: Bearer <votre_token>│   │   └── index.js            # Point d'entrée React

Content-Type: application/json│   └── package.json

│

{├── server/                     # API Node.js/Express (Backend)

  "firstName": "Jean",│   ├── src/

  "lastName": "Dupont",│   │   ├── config/             # Configuration (DB, CORS, Swagger)

  "phone": "0612345678"│   │   ├── controllers/        # Gestion des requêtes HTTP

}│   │   ├── middlewares/        # Auth, validation, erreurs

```│   │   ├── models/             # Schémas Mongoose (User, Contact)

│   │   ├── routes/             # Définition des endpoints

---│   │   ├── services/           # Logique métier

│   │   ├── utils/              # Utilitaires (apiResponse)

## 🛠️ Technologies Utilisées│   │   ├── tests/              # Tests unitaires Jest

│   │   ├── app.js              # Configuration Express

**Frontend**│   │   └── server.js           # Démarrage serveur

- React 19│   ├── jest.config.js          # Configuration tests

- React Router 7│   └── package.json

- Axios│

- Context API├── package.json                # Scripts racine (install-all, dev)

└── README.md                   # Documentation (ce fichier)

**Backend**```

- Node.js 18+

- Express 5### Flux de données

- MongoDB + Mongoose

- JWT (jsonwebtoken)```

- bcryptjs┌─────────────────────────────────────────────────────────┐

- Swagger/OpenAPI│                   CLIENT (React)                         │

│  Browser → React Router → Context API → Axios Services  │

**Tests & DevOps**└────────────────────────┬────────────────────────────────┘

- Jest + Supertest (couverture > 70%)                         │ HTTP + JWT Token

- Nodemon                         ↓

- Concurrently┌─────────────────────────────────────────────────────────┐

│                   SERVER (Express)                       │

---│  Routes → Auth Middleware → Controllers → Services      │

│                         ↓                                │

## 🏗️ Architecture│                  MongoDB (Mongoose)                      │

└─────────────────────────────────────────────────────────┘

``````

mycontacts-final/

├── client/                 # Application React---

│   ├── src/

│   │   ├── components/     # Composants UI## 🚀 **Installation**

│   │   ├── contexts/       # AuthContext

│   │   ├── services/       # API calls### Prérequis

│   │   └── App.js          # Routing- **Node.js** >= 18.x

│   └── package.json- **npm** >= 9.x

│- **MongoDB** (local ou Atlas)

├── server/                 # API Express- **Git**

│   ├── src/

│   │   ├── config/         # DB, CORS, Swagger### Étapes d'installation

│   │   ├── controllers/    # Logique HTTP

│   │   ├── models/         # Schémas Mongoose```bash

│   │   ├── routes/         # Endpoints# 1. Cloner le dépôt

│   │   ├── middlewares/    # Auth, validationgit clone https://github.com/sxlvrr/mycontacts.git

│   │   ├── services/       # Logique métiercd mycontacts

│   │   └── tests/          # Tests Jest

│   └── package.json# 2. Installer les dépendances (client + serveur)

│npm run install-all

└── package.json            # Scripts racine

```# Alternative : installation manuelle

npm run install-server

---npm run install-client

```

## 🧪 Tests

---

```bash

cd server## ⚙️ **Configuration**

npm test                # Tous les tests

npm test -- --coverage  # Avec couverture### 1. Variables d'environnement Backend

```

Créer un fichier `.env` dans le dossier `server/` :

**Couverture actuelle** : > 70% (branches, fonctions, lignes)

```env

---# Base de données MongoDB

MONGODB_URI=mongodb://localhost:27017/mycontacts

## 🌐 Déploiement# OU MongoDB Atlas

MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/mycontacts

### Backend (Render)

# Port du serveur

**Build Command:** `cd server && npm install`  PORT=5000

**Start Command:** `cd server && npm start`

# Secret JWT (générer une chaîne aléatoire sécurisée)

**Variables d'environnement:**JWT_SECRET=votre_secret_jwt_super_securise_a_changer

```

MONGODB_URI=mongodb+srv://...# URL du frontend (pour CORS)

JWT_SECRET=secret_securiseFRONTEND_URL=http://localhost:3000

FRONTEND_URL=https://votre-app.netlify.app```

PORT=5000

```### 2. Variables d'environnement Frontend



### Frontend (Netlify)Créer un fichier `.env` dans le dossier `client/` :



**Base directory:** `client`  ```env

**Build command:** `npm run build`  REACT_APP_API_URL=http://localhost:5000/api

**Publish directory:** `build````



**Variable d'environnement:**---

```

REACT_APP_API_URL=https://mycontacts-k14l.onrender.com/api## 📦 **Utilisation**

```

### Démarrage en développement

**Important MongoDB Atlas** : Autoriser les connexions depuis `0.0.0.0/0` (Network Access)

#### Option 1 : Lancement simultané (recommandé)

---```bash

# Depuis la racine du projet

## 🔐 Sécuriténpm run dev

```

- ✅ Authentification JWT statelessDémarre simultanément :

- ✅ Mots de passe hashés (bcrypt)- Backend sur `http://localhost:5000`

- ✅ Protection CORS configurée- Frontend sur `http://localhost:3000`

- ✅ Validation des données (client + serveur)

- ✅ Isolation des données par utilisateur#### Option 2 : Lancement séparé

- ✅ Routes protégées (middleware auth)

**Terminal 1 - Backend :**

---```bash

cd server

## 📚 Documentation Complètenpm run dev

```

Consultez la documentation interactive Swagger : http://localhost:5000/api-docs

**Terminal 2 - Frontend :**

---```bash

cd client

## 👤 Auteurnpm start

```

**Mathis Bodelot**  

GitHub: [@sxlvrr](https://github.com/sxlvrr)### Accès à l'application



---- **Frontend** : http://localhost:3000

- **Backend API** : http://localhost:5000/api

## 📄 Licence- **Documentation Swagger** : http://localhost:5000/api-docs



MIT - EFREI Paris 2025---


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
