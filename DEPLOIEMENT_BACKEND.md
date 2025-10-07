# Guide de Déploiement Backend sur Render

## 🚀 Configuration Render

### Étape 1 : Paramètres de Build & Deploy

Dans votre dashboard Render, configurez :

**Build Command:**
```bash
cd server && npm install
```

**Start Command:**
```bash
cd server && npm start
```

**Root Directory:** (laisser vide ou mettre `./`)

### Étape 2 : Variables d'Environnement

Ajoutez ces variables dans **Environment** :

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://mathis:rNOcJzIBHwZWHQER@cluster0.fau87pe.mongodb.net/mycontacts?retryWrites=true&w=majority
JWT_SECRET=tokenjwtsecret
FRONTEND_URL=https://votre-app.netlify.app
```

⚠️ **Important** : 
- Ajoutez `?retryWrites=true&w=majority` à votre URI MongoDB
- Remplacez `FRONTEND_URL` par votre URL Netlify une fois obtenue
- Changez `JWT_SECRET` par une clé secrète plus forte en production

### Étape 3 : Vérifier le déploiement

Une fois déployé, testez ces URLs :

1. **Page d'accueil** : `https://votre-app.onrender.com/`
   - Devrait afficher : `{"success": true, "message": "API MyContacts", ...}`

2. **Documentation API** : `https://votre-app.onrender.com/api-docs`
   - Interface Swagger

3. **Test Auth** : `https://votre-app.onrender.com/api/auth/register`
   - Endpoints d'authentification

## 🔧 Résolution de problèmes

### Erreur "Not Found"
- ✅ **Corrigé** : Route racine ajoutée dans `app.js`
- Redéployez après avoir commit les changements

### Erreur "Application failed to respond"
- Vérifiez que `PORT` est bien configuré dans les variables d'environnement
- Vérifiez les logs dans Render Dashboard

### Erreur de connexion MongoDB
- Vérifiez que l'URI MongoDB est correct
- Ajoutez l'IP de Render (0.0.0.0/0) dans MongoDB Atlas Network Access

### Erreur CORS
- Vérifiez que `FRONTEND_URL` correspond à votre URL Netlify
- Le fichier `cors.js` utilise cette variable

## 📱 Configuration Netlify (Frontend)

Une fois le backend déployé, ajoutez dans Netlify :

```
REACT_APP_API_URL=https://votre-app.onrender.com/api
```

⚠️ **N'oubliez pas** le `/api` à la fin !

## 🔄 Workflow de déploiement

1. **Commit & Push** vers GitHub
```bash
git add .
git commit -m "Config: Ajout route racine pour Render"
git push origin main
```

2. **Render** redéploie automatiquement

3. **Testez** l'URL : `https://votre-app.onrender.com/`

4. **Copiez l'URL** et configurez-la dans Netlify

## 🎯 URLs importantes

- **Backend Render** : `https://mycontacts-api.onrender.com`
- **Frontend Netlify** : `https://mycontacts.netlify.app`
- **MongoDB Atlas** : `https://cloud.mongodb.com`

## ⚠️ Note sur le plan gratuit Render

- L'application s'endort après 15 minutes d'inactivité
- Le premier accès peut prendre 30-60 secondes (cold start)
- Pour éviter cela, utilisez un service de ping (comme UptimeRobot)
