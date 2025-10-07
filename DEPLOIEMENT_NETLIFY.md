# Guide de Déploiement Netlify - MyContacts

## 📋 Prérequis
- Compte Netlify
- Accès à votre dépôt Git (GitHub, GitLab, ou Bitbucket)
- Le backend doit être déployé séparément (par exemple sur Render, Railway, ou Heroku)

## 🚀 Déploiement sur Netlify

### Étape 1 : Pusher les modifications
```bash
git push origin main
```

### Étape 2 : Connecter à Netlify
1. Connectez-vous à [Netlify](https://app.netlify.com/)
2. Cliquez sur **"Add new site"** > **"Import an existing project"**
3. Choisissez votre fournisseur Git et sélectionnez ce dépôt

### Étape 3 : Configuration du build (déjà configurée dans netlify.toml)
Le fichier `netlify.toml` contient déjà la configuration suivante :
- **Base directory** : `client/`
- **Build command** : `npm run build`
- **Publish directory** : `client/build`

### Étape 4 : Variables d'environnement
Dans l'interface Netlify, allez dans **Site settings** > **Environment variables** et ajoutez :

```
REACT_APP_API_URL=https://votre-backend-url.com
```

⚠️ **Important** : Remplacez `https://votre-backend-url.com` par l'URL de votre API backend déployée.

### Étape 5 : Déployer
Cliquez sur **"Deploy site"** et attendez que le build se termine.

## 🔧 Résolution de problèmes

### Problème : Erreur de sous-module Git
✅ **Résolu** : Le dossier `client` a été converti d'un sous-module Git en dossier normal.

### Problème : Erreurs de build
- Vérifiez les logs de build dans Netlify
- Assurez-vous que toutes les dépendances sont dans `client/package.json`
- Testez le build localement : `cd client && npm run build`

### Problème : L'application ne se connecte pas au backend
- Vérifiez que `REACT_APP_API_URL` est correctement configurée
- Vérifiez que votre backend autorise les requêtes CORS depuis votre domaine Netlify
- Vérifiez la configuration CORS dans `server/src/config/cors.js`

## 📝 Configuration CORS du Backend
Assurez-vous que votre backend autorise l'URL Netlify dans la configuration CORS :

```javascript
// Dans server/src/config/cors.js
const allowedOrigins = [
  'http://localhost:3000',
  'https://votre-app.netlify.app' // Ajoutez votre URL Netlify
];
```

## 🔄 Déploiements automatiques
Une fois configuré, Netlify déploiera automatiquement votre application à chaque push sur la branche principale.

## 📚 Ressources
- [Documentation Netlify](https://docs.netlify.com/)
- [Déployer une app React sur Netlify](https://docs.netlify.com/frameworks/react/)
