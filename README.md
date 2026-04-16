# Site Drop - Front + Back TypeScript Starter

Structure propre pour demarrer vite avec une page moderne de test:

```text
.
|- apps/
|  |- web/   # Vite + TypeScript + GSAP + Three.js
|  `- api/   # Express + TypeScript
|- package.json
`- tsconfig.base.json
```

## Lancer en dev

```bash
npm install
npm run dev
```

- Front: `http://localhost:5173`
- API: `http://localhost:8787/api/health`

## Scripts utiles

- `npm run dev:web` : demarre uniquement le frontend
- `npm run dev:api` : demarre uniquement le backend
- `npm run build` : build backend puis frontend

## Paiement Stripe (mode test)

1. Copier `apps/api/.env.example` vers `apps/api/.env`
2. Ajouter `STRIPE_SECRET_KEY`
3. Lancer `npm run dev`
4. Cliquer sur `Commander` dans le front pour ouvrir Stripe Checkout
