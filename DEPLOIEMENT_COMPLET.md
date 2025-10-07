# 🚀 Guide de Déploiement Complet - MyContacts

## ✅ URLs de Production

- **Backend (API)** : https://mycontacts-k14l.onrender.com
- **Frontend (React)** : À configurer sur Netlify

---

## 📦 1. Backend - Render (✅ Déployé)

### URL Backend
```
https://mycontacts-k14l.onrender.com
```

### Variables d'environnement configurées sur Render
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://mathis:rNOcJzIBHwZWHQER@cluster0.fau87pe.mongodb.net/mycontacts?retryWrites=true&w=majority
JWT_SECRET=tokenjwtsecret
FRONTEND_URL=https://votre-app.netlify.app
```

### Test du backend
```bash
# Page d'accueil de l'API
curl https://mycontacts-k14l.onrender.com/

# Documentation Swagger
https://mycontacts-k14l.onrender.com/api-docs

# Endpoints disponibles
https://mycontacts-k14l.onrender.com/api/auth/register
https://mycontacts-k14l.onrender.com/api/auth/login
https://mycontacts-k14l.onrender.com/api/contacts
```

⚠️ **Note** : Le premier accès peut prendre 30-60 secondes (cold start sur plan gratuit)

---

## 🌐 2. Frontend - Netlify

### Étapes de déploiement

1. **Allez sur [netlify.com](https://netlify.com)**
2. **Connectez votre dépôt GitHub** `sxlvrr/mycontacts`
3. **Configuration automatique** via `netlify.toml` :
   - Base directory : `client/`
   - Build command : `npm run build`
   - Publish directory : `build/`

4. **Ajoutez la variable d'environnement** :
   
   Dans **Site settings** → **Environment variables** :
   ```
   REACT_APP_API_URL=https://mycontacts-k14l.onrender.com/api
   ```

5. **Déployez** et copiez votre URL Netlify

6. **Mettez à jour la variable FRONTEND_URL sur Render** avec votre URL Netlify

---

## 🔄 Workflow de mise à jour

### Pour mettre à jour le code :

1. **Faites vos modifications localement**

2. **Commitez et poussez sur GitHub** :
   ```bash
   git add .
   git commit -m "Votre message"
   git push origin main
   git push origin main:master  # Pour synchroniser master
   ```

3. **Render et Netlify redéploient automatiquement** 🎉

---

## 🔧 Troubleshooting

### Backend ne répond pas
- ✅ Cold start normal (30-60s)
- Vérifier les logs Render : Dashboard → Votre service → Logs
- Vérifier que MongoDB Atlas autorise les connexions (IP 0.0.0.0/0)

### Frontend ne se connecte pas au backend
- Vérifier que `REACT_APP_API_URL` est bien configurée sur Netlify
- Vérifier que CORS accepte votre URL Netlify (déjà configuré avec regex)
- Ouvrir la console du navigateur pour voir les erreurs

### Erreur CORS
- ✅ Déjà configuré pour accepter toutes les URLs `*.netlify.app`
- Vérifier que `FRONTEND_URL` sur Render correspond à votre URL Netlify

---

## 📊 Monitoring

### Backend (Render)
- Dashboard : https://dashboard.render.com
- Logs en temps réel
- Métriques de performance

### Frontend (Netlify)
- Dashboard : https://app.netlify.com
- Logs de déploiement
- Analytics (optionnel)

---

## 💡 Optimisations futures

1. **Éviter le cold start** : Utiliser UptimeRobot pour ping l'API toutes les 5 min
2. **Custom domain** : Configurer un nom de domaine personnalisé
3. **SSL/HTTPS** : Déjà activé par défaut sur Render et Netlify ✅
4. **CI/CD avancé** : Ajouter des tests automatiques avant déploiement

---

## 🎯 Checklist finale

- [x] Backend déployé sur Render
- [x] Route racine `/` ajoutée
- [x] CORS configuré pour Netlify
- [ ] Frontend déployé sur Netlify
- [ ] Variable `REACT_APP_API_URL` configurée
- [ ] Test complet : inscription → login → gestion contacts
- [ ] `FRONTEND_URL` mise à jour sur Render

---

Bon déploiement ! 🚀
