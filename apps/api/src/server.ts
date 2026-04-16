import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import Stripe from 'stripe';

const app = express();
const port = Number(process.env.PORT ?? 8787);
const appUrl = process.env.APP_URL ?? 'http://localhost:5173';
const checkoutProductName = process.env.CHECKOUT_PRODUCT_NAME ?? 'Machine a glacons Signature';
const checkoutProductDescription =
  process.env.CHECKOUT_PRODUCT_DESCRIPTION ??
  'Machine a glacons premium avec cycle rapide et mode autonettoyant.';
const rawCheckoutAmount = Number(process.env.CHECKOUT_UNIT_AMOUNT_EUR_CENTS ?? 34900);
const checkoutAmount = Number.isFinite(rawCheckoutAmount) ? Math.max(50, Math.round(rawCheckoutAmount)) : 34900;

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

app.use(
  cors({
    origin: true
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'site-drop-api',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/demo', (_req, res) => {
  res.json({
    service: 'site-drop-api',
    status: 'online',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    message: 'API ready'
  });
});

app.post('/api/create-checkout-session', async (_req, res) => {
  if (!stripe) {
    res.status(500).json({
      error: 'Stripe non configure. Definis STRIPE_SECRET_KEY dans apps/api/.env.'
    });
    return;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      locale: 'fr',
      success_url: `${appUrl}?checkout=success`,
      cancel_url: `${appUrl}?checkout=canceled`,
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU']
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'eur',
            unit_amount: checkoutAmount,
            product_data: {
              name: checkoutProductName,
              description: checkoutProductDescription
            }
          }
        }
      ]
    });

    if (!session.url) {
      res.status(500).json({ error: 'Impossible de creer l URL de paiement Stripe.' });
      return;
    }

    res.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur Stripe inconnue';
    res.status(500).json({ error: message });
  }
});

app.listen(port, () => {
  console.log(`[api] listening on http://localhost:${port}`);
});
