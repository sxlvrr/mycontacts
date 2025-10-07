# MyContacts - Instructions de Déploiement

## 🌐 Déploiement du Backend (Render)

### Étape 1 : Préparation MongoDB Atlas
1. Créer un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créer un cluster gratuit
3. Créer un utilisateur de base de données
4. Whitelist l'IP `0.0.0.0/0` (accès depuis n'importe où)
5. Obtenir l'URI de connexion

### Étape 2 : Déploiement sur Render
1. Créer un compte sur [Render.com](https://render.com)
2. Nouveau Web Service → Connecter le repo GitHub
3. **Configuration :**
   - Name : `mycontacts-api`
   - Region : Frankfurt (EU)
   - Branch : `main`
   - Root Directory : `server`
   - Environment : Node
   - Build Command : `npm install`
   - Start Command : `npm start`
   
4. **Variables d'environnement :**
   ```
   MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/mycontacts
   JWT_SECRET=votre_secret_super_securise_32_caracteres_min
   FRONTEND_URL=https://votre-app.netlify.app
   PORT=5000
   ```

5. Déployer → Récupérer l'URL : `https://mycontacts-api.onrender.com`

---

## 🚀 Déploiement du Frontend (Netlify)

### Étape 1 : Préparer le build
1. Mettre à jour `client/.env` :
   ```
   REACT_APP_API_URL=https://mycontacts-api.onrender.com/api
   ```

### Étape 2 : Déploiement Netlify
1. Créer un compte sur [Netlify](https://netlify.com)
2. Nouveau site → Import from Git
3. **Configuration :**
   - Base directory : `client`
   - Build command : `npm run build`
   - Publish directory : `client/build`

4. **Variable d'environnement :**
   ```
   REACT_APP_API_URL=https://mycontacts-api.onrender.com/api
   ```

5. Déployer → Récupérer l'URL : `https://mycontacts-mathis.netlify.app`

### Étape 3 : Mise à jour CORS Backend
Retourner sur Render et mettre à jour `FRONTEND_URL` :
```
FRONTEND_URL=https://mycontacts-mathis.netlify.app
```

---

## ✅ Vérification du Déploiement

1. **Backend** : Accéder à `https://mycontacts-api.onrender.com/api`
   - Devrait afficher les infos de l'API
2. **Swagger** : `https://mycontacts-api.onrender.com/api-docs`
3. **Frontend** : `https://mycontacts-mathis.netlify.app`
   - Tester inscription/connexion
   - Ajouter un contact

---

## 📧 Livrable Final

Envoyer à [wassini.bouzidi@intervenants.efrei.net](mailto:wassini.bouzidi@intervenants.efrei.net) avant 23h59 :

```
Sujet : [Projet MyContacts] - Mathis

Bonjour,

Voici les liens de mon projet MyContacts :

🔗 Repository GitHub : https://github.com/sxlvrr/mycontacts
🌐 Frontend (Netlify) : https://mycontacts-mathis.netlify.app
🖥️ Backend (Render) : https://mycontacts-api.onrender.com
📚 Documentation Swagger : https://mycontacts-api.onrender.com/api-docs

Identifiants de test :
Email : demo@mycontacts.com
Password : Demo123456

Cordialement,
Mathis
```

---

## 🐛 Problèmes Courants

### Backend ne démarre pas
- Vérifier les logs Render
- Vérifier que MONGODB_URI est correct
- Vérifier que le port est 5000

### Frontend ne peut pas se connecter au backend
- Vérifier que REACT_APP_API_URL pointe vers le bon backend
- Vérifier CORS : FRONTEND_URL dans le backend doit correspondre à l'URL Netlify
- Vérifier que le backend est bien démarré

### Erreur 404 sur les routes React
- Vérifier que `_redirects` est bien dans `client/public/`
