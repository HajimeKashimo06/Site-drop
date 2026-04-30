# Site Drop - Hproweb

Monorepo du site Hproweb avec frontend Next.js et API Express.

```text
.
|- apps/
|  |- web-next/  # Front principal Next.js
|  `- api/       # API Express + TypeScript
|- package.json
`- tsconfig.base.json
```

## Lancer en dev

```bash
npm install
npm run dev
```

- Front principal: `http://localhost:5173`
- API: `http://localhost:8787/api/health`

## Scripts utiles

- `npm run dev:web` : demarre uniquement le frontend principal (`apps/web-next`)
- `npm run dev:api` : demarre uniquement le backend
- `npm run build` : build backend puis frontend principal

## Etat actuel

- Le frontend legacy `apps/web` a ete remplace par `apps/web-next`.
- Les anciennes URLs HTML sont redirigees vers les routes Next.
- L'admin cree et supprime les sites demo via l'API.
- La suppression d'un site demo efface aussi son dossier dans `apps/web-next/public/sites`.

## Paiement Stripe (mode test)

1. Copier `apps/api/.env.example` vers `apps/api/.env`
2. Ajouter `STRIPE_SECRET_KEY`
3. Lancer `npm run dev`
4. Cliquer sur `Commander` dans le front pour ouvrir Stripe Checkout
