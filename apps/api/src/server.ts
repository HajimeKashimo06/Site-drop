import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import Stripe from 'stripe';
import bcrypt from 'bcryptjs';
import nodemailer, { type Transporter } from 'nodemailer';
import { MongoClient, type Collection } from 'mongodb';
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Request, Response } from 'express';

const moduleDir = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(moduleDir, '../.env') });
dotenv.config();

const workspaceRoot = resolve(moduleDir, '../../..');
const demoSitesDataPath = resolve(moduleDir, '../data/demo-sites.json');
const siteTrafficDataPath = resolve(moduleDir, '../data/site-traffic.json');
const webPublicSitesRoot = resolve(workspaceRoot, 'apps/web/public/sites');

type UserRole = 'admin' | 'client';

type SiteUserDoc = {
  username: string;
  passwordHash: string;
  role?: UserRole;
  active?: boolean;
  siteAccess?: string[];
  createdAt: Date;
  updatedAt: Date;
};

type SessionIdentity = {
  username: string;
};

type DemoSite = {
  id: string;
  name: string;
  path: string;
  active: boolean;
};

type PublicDemoSite = {
  id: string;
  name: string;
  path: string;
};

type SiteTrafficEntry = {
  nonAdminClicks: number;
  lastClickAt: string | null;
};

type SiteTrafficMap = Record<string, SiteTrafficEntry>;

type ContactRequestBody = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  company?: unknown;
  subject?: unknown;
  message?: unknown;
  preferredWindow?: unknown;
  sourcePage?: unknown;
  website?: unknown;
};

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  preferredWindow: string;
  sourcePage: string;
};

type QuoteOfferId = 'essentiel' | 'pro' | 'grand-format';

type QuoteRequestBody = {
  offer?: unknown;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  message?: unknown;
  sourcePage?: unknown;
  website?: unknown;
};

type QuotePayload = {
  offer: QuoteOfferId;
  offerLabel: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  sourcePage: string;
};

const defaultDemoSites: DemoSite[] = [
  {
    id: 'page-test',
    name: 'Site test barber',
    path: '/page-test.html',
    active: true
  }
];

let demoSites = loadDemoSites();
let siteTraffic = loadSiteTraffic();
const fallbackSite: DemoSite = getFallbackSite() ??
  defaultDemoSites[0] ?? {
    id: 'page-test',
    name: 'Site test barber',
    path: '/page-test.html',
    active: true
  };

const app = express();
const port = Number(process.env.PORT ?? 8787);
const appUrl = process.env.APP_URL ?? 'http://localhost:5173';
const appOrigin = toOrigin(appUrl);
const allowedOrigins = buildAllowedOrigins(appOrigin);

const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017';
const mongoDbName = process.env.MONGO_DB_NAME ?? 'sitedrop';
const mongoUsersCollectionName = process.env.MONGO_USERS_COLLECTION ?? 'users';

const seedClientUsername = normalizeUsername(process.env.AUTH_DEMO_USERNAME ?? 'coiffure1');
const seedClientPassword = process.env.AUTH_DEMO_PASSWORD ?? '1234';
const seedAdminUsername = normalizeUsername(process.env.AUTH_ADMIN_USERNAME ?? 'admin');
const seedAdminPassword = process.env.AUTH_ADMIN_PASSWORD ?? 'Hproweb@2026!';

const authSessionSecret = process.env.AUTH_SESSION_SECRET ?? randomBytes(32).toString('hex');
const rawSessionTtl = Number(process.env.AUTH_SESSION_TTL_SECONDS ?? 8 * 60 * 60);
const authSessionTtlSeconds = Number.isFinite(rawSessionTtl) ? Math.max(300, Math.round(rawSessionTtl)) : 8 * 60 * 60;
const authSessionCookie = 'site_drop_session';
const secureCookie = process.env.AUTH_COOKIE_SECURE === 'true' || appOrigin.startsWith('https://');
const passwordHashRounds = 12;

const checkoutProductName = process.env.CHECKOUT_PRODUCT_NAME ?? 'Machine a glacons Signature';
const checkoutProductDescription =
  process.env.CHECKOUT_PRODUCT_DESCRIPTION ??
  'Machine a glacons premium avec cycle rapide et mode autonettoyant.';
const rawCheckoutAmount = Number(process.env.CHECKOUT_UNIT_AMOUNT_EUR_CENTS ?? 34900);
const checkoutAmount = Number.isFinite(rawCheckoutAmount) ? Math.max(50, Math.round(rawCheckoutAmount)) : 34900;

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

const contactToEmail = (process.env.CONTACT_TO_EMAIL ?? 'contact@hproweb.fr').trim().toLowerCase();
const smtpHost = (process.env.SMTP_HOST ?? '').trim();
const rawSmtpPort = Number(process.env.SMTP_PORT ?? '587');
const smtpPort = Number.isFinite(rawSmtpPort) ? Math.max(1, Math.round(rawSmtpPort)) : 587;
const smtpSecure = process.env.SMTP_SECURE === 'true';
const smtpUser = (process.env.SMTP_USER ?? '').trim();
const smtpPass = process.env.SMTP_PASS ?? '';
const smtpFrom = (process.env.SMTP_FROM ?? smtpUser).trim();
const hasSmtpConfig = Boolean(smtpHost && smtpPort && smtpUser && smtpPass && smtpFrom && contactToEmail);
const mailTransporter: Transporter | null = hasSmtpConfig
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    })
  : null;
const contactRateLimitWindowMs = 10 * 60 * 1000;
const contactRateLimitMaxRequests = 5;
const contactRateLimitByIp = new Map<string, number[]>();
const quoteOfferLabels: Record<QuoteOfferId, string> = {
  essentiel: 'Essentiel',
  pro: 'Pro',
  'grand-format': 'Grand format'
};

const mongoClient = new MongoClient(mongoUri);
const usersCollectionPromise = initUsersCollection();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true
  })
);
app.use(express.json());

if (!process.env.AUTH_SESSION_SECRET) {
  console.warn('[api] AUTH_SESSION_SECRET absent: secret temporaire genere pour ce demarrage.');
}

app.get('/api/demo-sites', (_req, res) => {
  res.json({
    sites: toPublicDemoSites(getActiveDemoSites())
  });
});

app.post('/api/auth/login', async (req, res) => {
  const result = await handleLogin(req, null);
  if (!result.ok) {
    res.status(result.status).json({ ok: false, error: result.error });
    return;
  }

  const role = getEffectiveRole(result.user);
  if (role === 'admin') {
    res.status(403).json({ ok: false, error: 'Utilise la connexion admin.' });
    return;
  }

  const redirectSite = getPrimaryAccessibleSite(result.user);
  if (!redirectSite) {
    res.status(403).json({ ok: false, error: 'Aucun site démo autorisé pour ce compte.' });
    return;
  }

  const sessionToken = signSession(result.user.username);
  setAuthCookie(res, sessionToken);
  res.json({
    ok: true,
    role,
    redirectPath: redirectSite.path,
    sites: toPublicDemoSites(resolveAccessibleSites(result.user))
  });
});

app.post('/api/auth/admin-login', async (req, res) => {
  const result = await handleLogin(req, 'admin');
  if (!result.ok) {
    res.status(result.status).json({ ok: false, error: result.error });
    return;
  }

  const sessionToken = signSession(result.user.username);
  setAuthCookie(res, sessionToken);
  res.json({
    ok: true,
    role: 'admin',
    redirectPath: '/admin.html'
  });
});

app.get('/api/auth/session', async (req, res) => {
  const user = await getAuthenticatedUser(req);
  if (!user) {
    clearAuthCookie(res);
    res.status(401).json({ authenticated: false });
    return;
  }

  const siteQuery = typeof req.query.site === 'string' ? normalizeSiteId(req.query.site) : '';
  const role = getEffectiveRole(user);

  if (siteQuery && role !== 'admin' && !hasSiteAccess(user, siteQuery)) {
    res.status(403).json({ authenticated: false, authorized: false });
    return;
  }

  if (siteQuery && role !== 'admin') {
    registerNonAdminSiteVisit(siteQuery);
  }

  const redirectSite = getPrimaryAccessibleSite(user);
  res.json({
    authenticated: true,
    username: user.username,
    role,
    redirectPath: role === 'admin' ? '/admin.html' : redirectSite?.path ?? null,
    sites: toPublicDemoSites(resolveAccessibleSites(user))
  });
});

app.get('/api/auth/admin-session', async (req, res) => {
  const user = await getAuthenticatedUser(req);
  if (!user || getEffectiveRole(user) !== 'admin') {
    clearAuthCookie(res);
    res.status(401).json({ authenticated: false });
    return;
  }

  res.json({
    authenticated: true,
    username: user.username,
    role: 'admin'
  });
});

app.post('/api/auth/logout', (_req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

app.get('/api/admin/demo-sites', async (req, res) => {
  const admin = await requireAdmin(req, res);
  if (!admin) {
    return;
  }

  res.json({
    sites: toPublicDemoSites(getActiveDemoSites()),
    currentAdmin: admin.username
  });
});

app.get('/api/admin/site-analytics', async (req, res) => {
  const admin = await requireAdmin(req, res);
  if (!admin) {
    return;
  }

  const sites = getActiveDemoSites().map((site) => {
    const traffic = siteTraffic[site.id];
    return {
      id: site.id,
      name: site.name,
      path: site.path,
      nonAdminClicks: traffic?.nonAdminClicks ?? 0,
      lastClickAt: traffic?.lastClickAt ?? null
    };
  });

  const totalNonAdminClicks = sites.reduce((sum, site) => sum + site.nonAdminClicks, 0);

  res.json({
    sites,
    totalNonAdminClicks,
    currentAdmin: admin.username
  });
});

app.post('/api/admin/demo-sites', async (req, res) => {
  const admin = await requireAdmin(req, res);
  if (!admin) {
    return;
  }

  const body = req.body as { name?: unknown; siteId?: unknown } | undefined;
  const name = normalizeDemoSiteName(body?.name);
  const requestedSiteId = normalizeSiteIdInput(body?.siteId);
  const siteId = requestedSiteId || slugifySiteId(name);
  const path = `/sites/${siteId}/index.html`;

  if (!name) {
    res.status(400).json({ ok: false, error: 'Nom du site invalide (2 a 80 caracteres).' });
    return;
  }

  if (!siteId) {
    res.status(400).json({ ok: false, error: "Identifiant invalide (lettres/chiffres/tirets uniquement)." });
    return;
  }

  if (demoSites.some((site) => normalizeSiteId(site.id) === siteId)) {
    res.status(409).json({ ok: false, error: 'Ce site existe deja.' });
    return;
  }

  const newSite: DemoSite = {
    id: siteId,
    name,
    path,
    active: true
  };
  const siteFolder = resolve(webPublicSitesRoot, siteId);
  const vscodeUri = buildVsCodeUri(workspaceRoot);
  const siteFolderPath = toWorkspaceRelativePath(siteFolder);

  try {
    await createDemoSiteStarter(newSite);
    demoSites = [...demoSites, newSite];
    persistDemoSites(demoSites);
    res.json({
      ok: true,
      site: toPublicDemoSites([newSite])[0],
      vscodeUri,
      siteFolderPath,
      currentAdmin: admin.username
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    res.status(500).json({ ok: false, error: `Creation du site impossible: ${message}` });
  }
});

app.delete('/api/admin/demo-sites/:siteId', async (req, res) => {
  const admin = await requireAdmin(req, res);
  if (!admin) {
    return;
  }

  const siteId = normalizeSiteId(req.params.siteId);
  if (!siteId) {
    res.status(400).json({ ok: false, error: 'Identifiant de site invalide.' });
    return;
  }

  const siteIndex = demoSites.findIndex((site) => normalizeSiteId(site.id) === siteId);
  if (siteIndex < 0) {
    res.status(404).json({ ok: false, error: 'Site introuvable.' });
    return;
  }

  try {
    await deleteDemoSiteFolder(siteId);
    const users = await usersCollectionPromise;
    await users.updateMany(
      { siteAccess: siteId },
      {
        $pull: { siteAccess: siteId },
        $set: { updatedAt: new Date() }
      }
    );

    const [removedSite] = demoSites.splice(siteIndex, 1);
    persistDemoSites(demoSites);
    if (siteTraffic[siteId]) {
      const { [siteId]: _removedTraffic, ...nextTraffic } = siteTraffic;
      siteTraffic = nextTraffic;
      persistSiteTraffic(siteTraffic);
    }
    res.json({
      ok: true,
      removedSite: removedSite
        ? {
            id: removedSite.id,
            name: removedSite.name,
            path: removedSite.path
          }
        : null
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    res.status(500).json({ ok: false, error: `Suppression du site impossible: ${message}` });
  }
});

app.get('/api/admin/users', async (req, res) => {
  const admin = await requireAdmin(req, res);
  if (!admin) {
    return;
  }

  const users = await usersCollectionPromise;
  const rows = await users
    .find({}, { projection: { _id: 0, username: 1, role: 1, active: 1, siteAccess: 1, createdAt: 1, updatedAt: 1 } })
    .sort({ username: 1 })
    .toArray();

  res.json({
    users: rows.map((row) => {
      const site = getPrimaryAccessibleSite(row);
      return {
        username: row.username,
        role: getEffectiveRole(row),
        active: row.active !== false,
        siteId: site?.id ?? null,
        siteName: site?.name ?? null,
        sitePath: site?.path ?? null,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt
      };
    }),
    currentAdmin: admin.username
  });
});

app.post('/api/admin/users', async (req, res) => {
  const admin = await requireAdmin(req, res);
  if (!admin) {
    return;
  }

  const body = req.body as {
    username?: unknown;
    password?: unknown;
    role?: unknown;
    active?: unknown;
    siteId?: unknown;
  };

  const username = normalizeUsername(typeof body.username === 'string' ? body.username : '');
  const password = typeof body.password === 'string' ? body.password : '';
  const role = normalizeRole(body.role);
  const active = body.active === undefined ? true : Boolean(body.active);
  const siteId = typeof body.siteId === 'string' ? normalizeSiteId(body.siteId) : '';

  if (!username || !role) {
    res.status(400).json({ ok: false, error: 'Username/role invalides.' });
    return;
  }

  if (role === 'client' && !findDemoSiteById(siteId)) {
    res.status(400).json({ ok: false, error: 'Site démo invalide.' });
    return;
  }

  const users = await usersCollectionPromise;
  const existing = await users.findOne({ username });
  const existingRole = existing ? getEffectiveRole(existing) : role;
  const existingActive = existing ? existing.active !== false : active;

  if (!existing && !password) {
    res.status(400).json({ ok: false, error: 'Mot de passe obligatoire pour créer un utilisateur.' });
    return;
  }

  if (username === admin.username && (!active || role !== 'admin')) {
    res.status(400).json({ ok: false, error: 'Vous ne pouvez pas retirer vos propres droits admin.' });
    return;
  }

  const adminWouldBeDisabled = existingRole === 'admin' && existingActive && (!active || role !== 'admin');
  if (adminWouldBeDisabled) {
    const activeAdmins = await countActiveAdmins();
    if (activeAdmins <= 1) {
      res.status(400).json({ ok: false, error: 'Impossible: il faut au moins 1 admin actif.' });
      return;
    }
  }

  const now = new Date();
  const nextSiteAccess = role === 'client' ? [siteId] : [];
  const setPayload: Partial<SiteUserDoc> = {
    role,
    active,
    siteAccess: nextSiteAccess,
    updatedAt: now
  };

  if (password) {
    setPayload.passwordHash = await bcrypt.hash(password, passwordHashRounds);
  }

  await users.updateOne(
    { username },
    {
      $set: setPayload,
      $setOnInsert: {
        username,
        createdAt: now
      }
    },
    { upsert: true }
  );

  res.json({ ok: true });
});

app.post('/api/admin/users/:username/toggle', async (req, res) => {
  const admin = await requireAdmin(req, res);
  if (!admin) {
    return;
  }

  const username = normalizeUsername(req.params.username);
  const body = req.body as { active?: unknown };
  const active = Boolean(body?.active);

  if (!username) {
    res.status(400).json({ ok: false, error: 'Utilisateur invalide.' });
    return;
  }

  const users = await usersCollectionPromise;
  const target = await users.findOne({ username });
  if (!target) {
    res.status(404).json({ ok: false, error: 'Utilisateur introuvable.' });
    return;
  }

  if (username === admin.username && !active) {
    res.status(400).json({ ok: false, error: 'Vous ne pouvez pas vous désactiver vous-même.' });
    return;
  }

  const targetIsActiveAdmin = getEffectiveRole(target) === 'admin' && target.active !== false;
  if (targetIsActiveAdmin && !active) {
    const activeAdmins = await countActiveAdmins();
    if (activeAdmins <= 1) {
      res.status(400).json({ ok: false, error: 'Impossible: il faut au moins 1 admin actif.' });
      return;
    }
  }

  await users.updateOne(
    { username },
    {
      $set: {
        active,
        updatedAt: new Date()
      }
    }
  );

  res.json({ ok: true });
});

app.post('/api/contact-request', async (req, res) => {
  const body = req.body as ContactRequestBody;
  const validation = parseContactPayload(body);
  if (!validation.ok) {
    res.status(400).json({ ok: false, error: validation.error });
    return;
  }

  const payload = validation.payload;
  const ip = getRequestIp(req);
  if (!canSubmitContactRequest(ip)) {
    res.status(429).json({
      ok: false,
      error: 'Trop de demandes en peu de temps. Veuillez réessayer dans quelques minutes.'
    });
    return;
  }

  if (!mailTransporter) {
    res.status(503).json({
      ok: false,
      error: 'Envoi email non configure. Renseigne SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS/SMTP_FROM.'
    });
    return;
  }

  const subject = `[Hproweb] ${payload.subject || 'Nouvelle demande de contact'} - ${payload.name}`;
  const lines = [
    'Nouvelle demande recue via le formulaire de contact.',
    '',
    `Nom: ${payload.name}`,
    `Telephone: ${payload.phone}`,
    `Email: ${payload.email || '-'}`,
    `Societe: ${payload.company || '-'}`,
    `Plage de rappel: ${payload.preferredWindow || '-'}`,
    `Page source: ${payload.sourcePage || '-'}`,
    '',
    'Message:',
    payload.message
  ];

  try {
    await mailTransporter.sendMail({
      from: smtpFrom,
      to: contactToEmail,
      replyTo: payload.email || undefined,
      subject,
      text: lines.join('\n')
    });

    res.json({
      ok: true,
      message: 'Demande envoyee. Nous revenons vers vous rapidement.'
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur email inconnue';
    res.status(500).json({ ok: false, error: `Envoi email impossible: ${message}` });
  }
});

app.post('/api/quote-request', async (req, res) => {
  const body = req.body as QuoteRequestBody;
  const validation = parseQuotePayload(body);
  if (!validation.ok) {
    res.status(400).json({ ok: false, error: validation.error });
    return;
  }

  const payload = validation.payload;
  const ip = getRequestIp(req);
  if (!canSubmitContactRequest(ip)) {
    res.status(429).json({
      ok: false,
      error: 'Trop de demandes en peu de temps. Veuillez réessayer dans quelques minutes.'
    });
    return;
  }

  if (!mailTransporter) {
    res.status(503).json({
      ok: false,
      error: 'Envoi email non configuré. Renseigne SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS/SMTP_FROM.'
    });
    return;
  }

  const subject = `[Hproweb] Demande de devis - ${payload.offerLabel} - ${payload.name}`;
  const lines = [
    'Nouvelle demande de devis reçue via le formulaire dédié.',
    '',
    `Offre choisie: ${payload.offerLabel}`,
    `Nom: ${payload.name}`,
    `Téléphone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Page source: ${payload.sourcePage || '-'}`,
    '',
    'Message:',
    payload.message || '(Aucun message complémentaire)'
  ];

  try {
    await mailTransporter.sendMail({
      from: smtpFrom,
      to: contactToEmail,
      replyTo: payload.email,
      subject,
      text: lines.join('\n')
    });

    res.json({
      ok: true,
      message: 'Demande de devis envoyée. Nous revenons vers vous rapidement.'
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur email inconnue';
    res.status(500).json({ ok: false, error: `Envoi email impossible: ${message}` });
  }
});

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

void startServer();

async function startServer(): Promise<void> {
  try {
    await usersCollectionPromise;
    if (mailTransporter) {
      await mailTransporter.verify();
      console.log(`[api] smtp ready on ${smtpHost}:${smtpPort}`);
    } else {
      console.warn('[api] SMTP non configure: /api/contact-request repondra 503.');
    }

    app.listen(port, () => {
      console.log(`[api] listening on http://localhost:${port}`);
      console.log(`[api] mongodb connected on ${mongoUri}/${mongoDbName}`);
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur MongoDB inconnue';
    console.error(`[api] bootstrap failed: ${message}`);
    process.exit(1);
  }
}

async function initUsersCollection(): Promise<Collection<SiteUserDoc>> {
  await mongoClient.connect();
  const db = mongoClient.db(mongoDbName);
  const users = db.collection<SiteUserDoc>(mongoUsersCollectionName);
  await users.createIndex({ username: 1 }, { unique: true });
  await users.updateMany({ role: { $exists: false } }, { $set: { role: 'client' } });
  await users.updateMany({ active: { $exists: false } }, { $set: { active: true } });
  await users.updateMany(
    {
      role: 'client',
      $or: [{ siteAccess: { $exists: false } }, { siteAccess: { $size: 0 } }]
    },
    { $set: { siteAccess: [fallbackSite.id] } }
  );
  await ensureSeedUser(users, seedClientUsername, seedClientPassword, 'client', [fallbackSite.id]);
  await ensureSeedUser(users, seedAdminUsername, seedAdminPassword, 'admin', []);
  return users;
}

async function ensureSeedUser(
  users: Collection<SiteUserDoc>,
  username: string,
  password: string,
  role: UserRole,
  siteAccess: string[]
): Promise<void> {
  if (!username || !password) {
    return;
  }

  const normalizedSites = normalizeSiteAccess(siteAccess);
  const existing = await users.findOne({ username });
  if (existing) {
    const updates: Partial<SiteUserDoc> = {};
    if (getEffectiveRole(existing) !== role) {
      updates.role = role;
    }

    if (role === 'client') {
      const existingSites = normalizeSiteAccess(existing.siteAccess ?? []);
      if (existingSites.length === 0) {
        updates.siteAccess = normalizedSites;
      }
    } else if ((existing.siteAccess ?? []).length > 0) {
      updates.siteAccess = [];
    }

    if (Object.keys(updates).length > 0) {
      updates.updatedAt = new Date();
      await users.updateOne({ username }, { $set: updates });
    }
    return;
  }

  const now = new Date();
  const passwordHash = await bcrypt.hash(password, passwordHashRounds);
  await users.insertOne({
    username,
    passwordHash,
    role,
    active: true,
    siteAccess: role === 'client' ? normalizedSites : [],
    createdAt: now,
    updatedAt: now
  });

  console.log(`[api] seeded ${role} user: ${username}`);
}

async function handleLogin(
  req: Request,
  roleFilter: UserRole | null
): Promise<
  | { ok: true; user: SiteUserDoc }
  | { ok: false; status: number; error: string }
> {
  const body = req.body as { username?: unknown; password?: unknown } | undefined;
  const rawUsername = typeof body?.username === 'string' ? body.username : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  const username = normalizeUsername(rawUsername);

  if (!username || !password) {
    return { ok: false, status: 400, error: 'Identifiants manquants.' };
  }

  try {
    const user = await authenticateUser(username, password, roleFilter);
    if (!user) {
      return { ok: false, status: 401, error: 'Identifiants invalides.' };
    }
    return { ok: true, user };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return { ok: false, status: 500, error: `Erreur auth: ${message}` };
  }
}

async function authenticateUser(username: string, password: string, roleFilter: UserRole | null): Promise<SiteUserDoc | null> {
  const user = await findActiveUserByUsername(username);
  if (!user) {
    return null;
  }

  const role = getEffectiveRole(user);
  if (roleFilter && role !== roleFilter) {
    return null;
  }

  const isValidPass = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPass) {
    return null;
  }

  return user;
}

async function getAuthenticatedUser(req: Request): Promise<SiteUserDoc | null> {
  const token = readAuthCookie(req);
  if (!token) {
    return null;
  }

  const session = verifySession(token);
  if (!session) {
    return null;
  }

  return findActiveUserByUsername(session.username);
}

async function requireAdmin(req: Request, res: Response): Promise<SiteUserDoc | null> {
  const user = await getAuthenticatedUser(req);
  if (!user || getEffectiveRole(user) !== 'admin') {
    clearAuthCookie(res);
    res.status(403).json({ ok: false, error: 'Accès admin refusé.' });
    return null;
  }
  return user;
}

async function findActiveUserByUsername(username: string): Promise<SiteUserDoc | null> {
  const users = await usersCollectionPromise;
  return users.findOne({
    username,
    active: { $ne: false }
  });
}

async function countActiveAdmins(): Promise<number> {
  const users = await usersCollectionPromise;
  return users.countDocuments({
    role: 'admin',
    active: { $ne: false }
  });
}

function signSession(username: string): string {
  const expiresAt = Date.now() + authSessionTtlSeconds * 1000;
  const encodedUser = Buffer.from(username, 'utf8').toString('base64url');
  const payload = `${encodedUser}.${expiresAt}`;
  const signature = createSignature(payload);
  return `${payload}.${signature}`;
}

function verifySession(token: string): SessionIdentity | null {
  const [encodedUser, expiresAtRaw, signature] = token.split('.');
  if (!encodedUser || !expiresAtRaw || !signature) {
    return null;
  }

  const payload = `${encodedUser}.${expiresAtRaw}`;
  const expectedSignature = createSignature(payload);
  if (!secureEqual(signature, expectedSignature)) {
    return null;
  }

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) {
    return null;
  }

  try {
    const username = normalizeUsername(Buffer.from(encodedUser, 'base64url').toString('utf8'));
    if (!username) {
      return null;
    }
    return { username };
  } catch {
    return null;
  }
}

function createSignature(payload: string): string {
  return createHmac('sha256', authSessionSecret).update(payload).digest('base64url');
}

function readAuthCookie(req: Request): string | null {
  const cookies = parseCookieHeader(req.headers.cookie);
  return cookies[authSessionCookie] ?? null;
}

function setAuthCookie(res: Response, token: string): void {
  res.cookie(authSessionCookie, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: secureCookie,
    path: '/',
    maxAge: authSessionTtlSeconds * 1000
  });
}

function clearAuthCookie(res: Response): void {
  res.clearCookie(authSessionCookie, {
    httpOnly: true,
    sameSite: 'lax',
    secure: secureCookie,
    path: '/'
  });
}

function parseCookieHeader(cookieHeader: string | undefined): Record<string, string> {
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader.split(';').reduce<Record<string, string>>((accumulator, part) => {
    const separator = part.indexOf('=');
    if (separator <= 0) {
      return accumulator;
    }

    const key = part.slice(0, separator).trim();
    const value = part.slice(separator + 1).trim();
    if (!key) {
      return accumulator;
    }

    accumulator[key] = decodeURIComponent(value);
    return accumulator;
  }, {});
}

function secureEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left, 'utf8');
  const rightBuffer = Buffer.from(right, 'utf8');

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function parseContactPayload(input: ContactRequestBody):
  | { ok: true; payload: ContactPayload }
  | { ok: false; error: string } {
  const honeypot = normalizeOptionalField(input.website, 120);
  if (honeypot) {
    return { ok: false, error: 'Demande invalide.' };
  }

  const name = normalizeRequiredField(input.name, 2, 120);
  if (!name) {
    return { ok: false, error: 'Nom invalide (2 a 120 caracteres).' };
  }

  const phone = normalizeRequiredField(input.phone, 6, 30);
  if (!phone || !isValidPhone(phone)) {
    return { ok: false, error: 'Telephone invalide.' };
  }

  const email = normalizeRequiredField(input.email, 5, 160);
  if (!email || !isValidEmail(email)) {
    return { ok: false, error: 'Email invalide.' };
  }

  const company = normalizeOptionalField(input.company, 160);
  const subject = normalizeOptionalField(input.subject, 140);
  const preferredWindow = normalizeOptionalField(input.preferredWindow, 120);
  const sourcePage = normalizeOptionalField(input.sourcePage, 180);
  const message = normalizeRequiredField(input.message, 10, 3000);
  if (!message) {
    return { ok: false, error: 'Message invalide (10 a 3000 caracteres).' };
  }

  return {
    ok: true,
    payload: {
      name,
      phone,
      email,
      company,
      subject,
      message,
      preferredWindow,
      sourcePage
    }
  };
}

function parseQuotePayload(input: QuoteRequestBody):
  | { ok: true; payload: QuotePayload }
  | { ok: false; error: string } {
  const honeypot = normalizeOptionalField(input.website, 120);
  if (honeypot) {
    return { ok: false, error: 'Demande invalide.' };
  }

  const offerRaw = normalizeOptionalField(input.offer, 40);
  const offer = normalizeQuoteOffer(offerRaw);
  if (!offer) {
    return { ok: false, error: 'Offre invalide.' };
  }

  const name = normalizeRequiredField(input.name, 2, 120);
  if (!name) {
    return { ok: false, error: 'Nom invalide (2 à 120 caractères).' };
  }

  const phone = normalizeRequiredField(input.phone, 6, 30);
  if (!phone || !isValidPhone(phone)) {
    return { ok: false, error: 'Téléphone invalide.' };
  }

  const email = normalizeRequiredField(input.email, 5, 160);
  if (!email || !isValidEmail(email)) {
    return { ok: false, error: 'Email invalide.' };
  }

  const message = normalizeOptionalField(input.message, 3000);
  const sourcePage = normalizeOptionalField(input.sourcePage, 180);
  const offerLabel = quoteOfferLabels[offer];

  return {
    ok: true,
    payload: {
      offer,
      offerLabel,
      name,
      phone,
      email,
      message,
      sourcePage
    }
  };
}

function normalizeQuoteOffer(value: string): QuoteOfferId | null {
  if (value === 'essentiel' || value === 'pro' || value === 'grand-format') {
    return value;
  }
  return null;
}

function normalizeRequiredField(value: unknown, minLength: number, maxLength: number): string | null {
  if (typeof value !== 'string') {
    return null;
  }
  const normalized = value.trim().replace(/\s+/g, ' ');
  if (normalized.length < minLength || normalized.length > maxLength) {
    return null;
  }
  return normalized;
}

function normalizeOptionalField(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') {
    return '';
  }
  const normalized = value.trim().replace(/\s+/g, ' ');
  if (!normalized || normalized.length > maxLength) {
    return '';
  }
  return normalized;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(value);
}

function isValidPhone(value: string): boolean {
  return /^[0-9+().\-\s]{6,30}$/i.test(value);
}

function getRequestIp(req: Request): string {
  return req.ip || req.socket.remoteAddress || 'unknown';
}

function canSubmitContactRequest(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - contactRateLimitWindowMs;
  const existing = contactRateLimitByIp.get(ip) ?? [];
  const recent = existing.filter((value) => value >= windowStart);
  if (recent.length >= contactRateLimitMaxRequests) {
    contactRateLimitByIp.set(ip, recent);
    return false;
  }
  recent.push(now);
  contactRateLimitByIp.set(ip, recent);

  if (contactRateLimitByIp.size > 5000) {
    // Evite une croissance infinie sur un process long.
    for (const [entryIp, timestamps] of contactRateLimitByIp.entries()) {
      const stillRecent = timestamps.filter((value) => value >= windowStart);
      if (stillRecent.length === 0) {
        contactRateLimitByIp.delete(entryIp);
      } else {
        contactRateLimitByIp.set(entryIp, stillRecent);
      }
    }
  }

  return true;
}

function toOrigin(urlLike: string): string {
  try {
    return new URL(urlLike).origin;
  } catch {
    return urlLike;
  }
}

function buildAllowedOrigins(baseOrigin: string): Set<string> {
  const allowed = new Set<string>(['http://localhost:5173']);
  if (baseOrigin) {
    allowed.add(baseOrigin);
    try {
      const parsed = new URL(baseOrigin);
      allowed.add(`https://${parsed.host}`);
      allowed.add(`http://${parsed.host}`);
    } catch {
    }
  }

  const extras = (process.env.CORS_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  extras.forEach((value) => allowed.add(value));
  return allowed;
}

function normalizeUsername(value: string): string {
  return value.trim().toLowerCase();
}

function normalizeRole(value: unknown): UserRole | null {
  return value === 'admin' || value === 'client' ? value : null;
}

function normalizeSiteId(value: string): string {
  return value.trim().toLowerCase();
}

function normalizeSiteIdInput(value: unknown): string {
  if (typeof value !== 'string') {
    return '';
  }
  return slugifySiteId(value);
}

function slugifySiteId(value: string): string {
  const normalized = normalizeSiteId(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
  if (normalized.length < 2) {
    return '';
  }
  return normalized;
}

function normalizeDemoSiteName(value: unknown): string {
  if (typeof value !== 'string') {
    return '';
  }
  const normalized = value.trim().replace(/\s+/g, ' ');
  if (normalized.length < 2 || normalized.length > 80) {
    return '';
  }
  return normalized;
}

function normalizeSiteAccess(siteAccess: string[]): string[] {
  const dedup = new Set<string>();
  for (const id of siteAccess) {
    const normalized = normalizeSiteId(id);
    if (!normalized) {
      continue;
    }
    if (!findDemoSiteById(normalized)) {
      continue;
    }
    dedup.add(normalized);
  }
  return Array.from(dedup);
}

function getEffectiveRole(user: Pick<SiteUserDoc, 'role'>): UserRole {
  return user.role === 'admin' ? 'admin' : 'client';
}

function getActiveDemoSites(): DemoSite[] {
  return demoSites.filter((site) => site.active);
}

function getFallbackSite(): DemoSite | null {
  const activeSites = getActiveDemoSites();
  return activeSites[0] ?? demoSites[0] ?? defaultDemoSites[0] ?? null;
}

function resolveAccessibleSites(user: Pick<SiteUserDoc, 'role' | 'siteAccess'>): DemoSite[] {
  const activeSites = getActiveDemoSites();
  if (getEffectiveRole(user) === 'admin') {
    return activeSites;
  }
  const allowedIds = new Set(normalizeSiteAccess(user.siteAccess ?? []));
  return activeSites.filter((site) => allowedIds.has(site.id));
}

function hasSiteAccess(user: Pick<SiteUserDoc, 'role' | 'siteAccess'>, siteId: string): boolean {
  if (getEffectiveRole(user) === 'admin') {
    return true;
  }
  const normalized = normalizeSiteId(siteId);
  return resolveAccessibleSites(user).some((site) => site.id === normalized);
}

function getPrimaryAccessibleSite(user: Pick<SiteUserDoc, 'role' | 'siteAccess'>): DemoSite | null {
  const sites = resolveAccessibleSites(user);
  return sites[0] ?? null;
}

function toPublicDemoSites(sites: DemoSite[]): PublicDemoSite[] {
  return sites.map((site) => ({
    id: site.id,
    name: site.name,
    path: site.path
  }));
}

function findDemoSiteById(siteId: string): DemoSite | null {
  const normalized = normalizeSiteId(siteId);
  return getActiveDemoSites().find((site) => site.id === normalized) ?? null;
}

function loadDemoSites(): DemoSite[] {
  const fromFile = loadDemoSitesFromFile();
  if (fromFile.length > 0) {
    return fromFile;
  }

  const fromEnv = parseDemoSitesFromJson(process.env.DEMO_SITES_JSON);
  if (fromEnv.length > 0) {
    persistDemoSites(fromEnv);
    return fromEnv;
  }

  persistDemoSites(defaultDemoSites);
  return defaultDemoSites;
}

function loadSiteTraffic(): SiteTrafficMap {
  if (!existsSync(siteTrafficDataPath)) {
    return {};
  }

  try {
    const raw = readFileSync(siteTrafficDataPath, 'utf8').replace(/^\uFEFF/, '');
    const parsed = JSON.parse(raw) as unknown;
    return normalizeSiteTraffic(parsed);
  } catch {
    return {};
  }
}

function normalizeSiteTraffic(input: unknown): SiteTrafficMap {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return {};
  }

  const output: SiteTrafficMap = {};

  for (const [key, value] of Object.entries(input)) {
    const siteId = normalizeSiteId(key);
    if (!siteId) {
      continue;
    }

    const candidate = value as { nonAdminClicks?: unknown; lastClickAt?: unknown };
    const clicksRaw = Number(candidate.nonAdminClicks);
    const nonAdminClicks = Number.isFinite(clicksRaw) ? Math.max(0, Math.floor(clicksRaw)) : 0;

    const lastClickAtRaw = typeof candidate.lastClickAt === 'string' ? candidate.lastClickAt.trim() : '';
    const lastClickAt = lastClickAtRaw && !Number.isNaN(new Date(lastClickAtRaw).getTime()) ? lastClickAtRaw : null;

    output[siteId] = {
      nonAdminClicks,
      lastClickAt
    };
  }

  return output;
}

function persistSiteTraffic(stats: SiteTrafficMap): void {
  mkdirSync(dirname(siteTrafficDataPath), { recursive: true });
  writeFileSync(siteTrafficDataPath, JSON.stringify(stats, null, 2), 'utf8');
}

function registerNonAdminSiteVisit(siteId: string): void {
  const normalizedSiteId = normalizeSiteId(siteId);
  if (!normalizedSiteId) {
    return;
  }

  const current = siteTraffic[normalizedSiteId] ?? {
    nonAdminClicks: 0,
    lastClickAt: null
  };

  siteTraffic = {
    ...siteTraffic,
    [normalizedSiteId]: {
      nonAdminClicks: current.nonAdminClicks + 1,
      lastClickAt: new Date().toISOString()
    }
  };

  persistSiteTraffic(siteTraffic);
}

function loadDemoSitesFromFile(): DemoSite[] {
  if (!existsSync(demoSitesDataPath)) {
    return [];
  }

  try {
    const raw = readFileSync(demoSitesDataPath, 'utf8').replace(/^\uFEFF/, '');
    const parsed = JSON.parse(raw) as unknown;
    return normalizeDemoSites(parsed);
  } catch {
    return [];
  }
}

function parseDemoSitesFromJson(rawJson: string | undefined): DemoSite[] {
  if (!rawJson) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawJson) as unknown;
    return normalizeDemoSites(parsed);
  } catch {
    return [];
  }
}

function normalizeDemoSites(input: unknown): DemoSite[] {
  if (!Array.isArray(input)) {
    return [];
  }

  const sites: DemoSite[] = [];
  const ids = new Set<string>();

  for (const item of input) {
    const candidate = item as { id?: unknown; name?: unknown; path?: unknown; active?: unknown };
    const id = slugifySiteId(typeof candidate.id === 'string' ? candidate.id : '');
    const name = normalizeDemoSiteName(candidate.name);
    const pathRaw = typeof candidate.path === 'string' ? candidate.path.trim() : '';
    const path = pathRaw.startsWith('/') ? pathRaw : '';
    const active = candidate.active === undefined ? true : Boolean(candidate.active);

    if (!id || !name || !path || ids.has(id)) {
      continue;
    }

    sites.push({ id, name, path, active });
    ids.add(id);
  }

  return sites;
}

function persistDemoSites(sites: DemoSite[]): void {
  const normalized = normalizeDemoSites(sites);
  const output = normalized.length > 0 ? normalized : defaultDemoSites;
  mkdirSync(dirname(demoSitesDataPath), { recursive: true });
  writeFileSync(demoSitesDataPath, JSON.stringify(output, null, 2), 'utf8');
}

async function createDemoSiteStarter(site: DemoSite): Promise<void> {
  await mkdir(webPublicSitesRoot, { recursive: true });

  const siteFolder = resolveSiteFolder(site.id);
  const htmlPath = join(siteFolder, 'index.html');
  if (existsSync(siteFolder)) {
    if (!existsSync(htmlPath)) {
      await writeFile(htmlPath, buildDemoSiteStarterHtml(site), 'utf8');
    }
    return;
  }

  await mkdir(siteFolder, { recursive: false });
  await writeFile(htmlPath, buildDemoSiteStarterHtml(site), 'utf8');
}

async function deleteDemoSiteFolder(siteId: string): Promise<void> {
  const siteFolder = resolveSiteFolder(siteId);
  await rm(siteFolder, { recursive: true, force: true });
}

function resolveSiteFolder(siteId: string): string {
  const siteFolder = resolve(webPublicSitesRoot, siteId);
  const relativePath = relative(webPublicSitesRoot, siteFolder);
  if (!relativePath || relativePath.startsWith('..') || isAbsolute(relativePath)) {
    throw new Error('Chemin de site invalide.');
  }
  return siteFolder;
}

function buildDemoSiteStarterHtml(site: DemoSite): string {
  const safeName = escapeHtmlText(site.name);
  const safeSiteId = escapeHtmlText(site.id);
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeName}</title>
    <style>
      :root {
        color-scheme: light;
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: "Segoe UI", Arial, sans-serif;
        color: #12324d;
        background: linear-gradient(145deg, #eaf2fb, #f9fbff);
      }
      main {
        width: min(760px, calc(100% - 2rem));
        border-radius: 16px;
        background: #ffffff;
        border: 1px solid #d8e4f0;
        box-shadow: 0 12px 30px rgba(16, 41, 68, 0.12);
        padding: 1.4rem;
      }
      h1 {
        margin: 0;
        font-size: 1.7rem;
      }
      p {
        margin: 0.7rem 0 0;
        line-height: 1.45;
      }
      .pill {
        display: inline-flex;
        margin-top: 0.9rem;
        border-radius: 999px;
        border: 1px solid #bfd2e5;
        padding: 0.35rem 0.65rem;
        font-size: 0.82rem;
        color: #305477;
      }
      .cta {
        display: inline-flex;
        margin-top: 1.1rem;
        border-radius: 999px;
        text-decoration: none;
        padding: 0.55rem 0.95rem;
        color: #fff;
        background: #1b7f43;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>${safeName}</h1>
      <p>Page de demarrage creee depuis l'espace admin.</p>
      <p>Vous pouvez maintenant personnaliser ce site et y ajouter vos sections.</p>
      <span class="pill">ID site: ${safeSiteId}</span>
      <a class="cta" href="/">Retour a l'accueil pro</a>
    </main>
    <script>
      (async () => {
        try {
          const response = await fetch('/api/auth/session?site=${safeSiteId}', {
            method: 'GET',
            credentials: 'include'
          });
          if (!response.ok) {
            window.location.replace('/demo-site.html');
          }
        } catch {
          window.location.replace('/demo-site.html');
        }
      })();
    </script>
  </body>
</html>
`;
}

function escapeHtmlText(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildVsCodeUri(folderPath: string): string {
  const normalized = folderPath.replace(/\\/g, '/');
  return `vscode://file/${encodeURI(normalized)}`;
}

function toWorkspaceRelativePath(targetPath: string): string {
  const relativePath = relative(workspaceRoot, targetPath).replace(/\\/g, '/');
  if (!relativePath || relativePath.startsWith('..')) {
    return targetPath;
  }
  return relativePath;
}
