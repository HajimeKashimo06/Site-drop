# Hproweb Front Next.js

Frontend principal du projet Site Drop / Hproweb.

## Stack

- Next.js App Router
- React 19
- Tailwind CSS 4
- Framer Motion

## Lancer en local

Depuis la racine du projet:

```bash
npm install
npm run dev
```

Ports utilises par defaut:

- Front Next.js: `http://localhost:5173`
- API Express: `http://localhost:8787`

## Routes principales

- `/` : accueil
- `/demo-site` : portail des demos
- `/admin` : espace d'administration
- `/sites/[siteId]` : demo client
- `/api/[...path]` : proxy Next vers l'API Express

## Build

```bash
npm run build --workspace @sitedrop/web-next
```

Le projet est configure avec `output: "standalone"` pour le deploiement IIS / reverse proxy.

## Notes de migration

- Les anciennes pages HTML (`/admin.html`, `/demo-site.html`, `/page-test.html`, etc.) sont redirigees vers les routes Next equivalentes.
- Les assets des demos restent dans `public/sites/<siteId>`.
- La suppression d'un site demo via l'admin supprime aussi son dossier physique et rend la route `/sites/<siteId>` invalide.
