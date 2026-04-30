# Guide MongoDB (Debutant)

Ce guide explique comment acceder a MongoDB et gerer tes identifiants de connexion sans me demander.

## 1) Verifier que MongoDB tourne

Dans PowerShell:

```powershell
Get-Service MongoDB
```

Si le service n'est pas en `Running`:

```powershell
Start-Service MongoDB
```

## 2) Ouvrir le shell MongoDB

```powershell
mongosh
```

Tu verras un prompt du type:

```text
test>
```

## 3) Commandes de base dans `mongosh`

Afficher les bases:

```javascript
show dbs
```

Utiliser (ou creer) la base du projet:

```javascript
use sitedrop
```

Voir les collections:

```javascript
show collections
```

Voir les utilisateurs du site:

```javascript
db.users.find({}, { _id: 0, username: 1, active: 1, createdAt: 1, updatedAt: 1 }).pretty()
```

Quitter:

```javascript
exit
```

## 4) Creer des identifiants toi-meme (recommande)

Tu peux ajouter un compte de connexion avec une seule commande:

```powershell
npm run user:add -- coiffure2 1234 client page-test
```

- `coiffure2` = identifiant
- `1234` = mot de passe
- `client` = role
- `page-test` = site demo autorise

Le mot de passe est stocke en hash (securise), pas en clair.

Pour creer un admin:

```powershell
npm run user:add -- monadmin MonPass@2026 admin
```

## 5) Lister les identifiants du site

```powershell
npm run user:list
```

## 6) Desactiver un identifiant

```powershell
npm run user:disable -- coiffure2
```

L'utilisateur ne pourra plus se connecter.

## 7) Configuration utilisee par l'API

Dans `apps/api/.env`:

```text
MONGO_URI=mongodb://127.0.0.1:27017
MONGO_DB_NAME=sitedrop
MONGO_USERS_COLLECTION=users
AUTH_ADMIN_USERNAME=admin
AUTH_ADMIN_PASSWORD=Hproweb@2026!
```

Page admin:

```text
https://hproweb.fr/admin
```

## 8) Emplacement de la config MongoDB

```text
C:\Program Files\MongoDB\Server\8.2\bin\mongod.cfg
```

## 9) Important securite

- Ne pas stocker les mots de passe en clair.
- Ne jamais connecter MongoDB directement depuis le front (navigateur).
- Toujours passer par l'API backend.
