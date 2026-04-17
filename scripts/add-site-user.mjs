import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const apiEnvPath = resolve(projectRoot, 'apps', 'api', '.env');

await loadEnvFile(apiEnvPath);

const [rawUsername, rawPassword, rawRole, rawSiteId] = process.argv.slice(2);
const username = normalizeUsername(rawUsername ?? '');
const password = rawPassword ?? '';
const role = normalizeRole(rawRole ?? 'client');
const siteId = normalizeSiteId(rawSiteId ?? 'page-test');

if (!username || !password || !role) {
  console.error(
    'Usage: node scripts/add-site-user.mjs <identifiant> <mot_de_passe> [client|admin] [site_id]'
  );
  process.exit(1);
}

if (role === 'client' && !siteId) {
  console.error('Pour un client, site_id est obligatoire (ex: page-test).');
  process.exit(1);
}

const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017';
const dbName = process.env.MONGO_DB_NAME ?? 'sitedrop';
const collectionName = process.env.MONGO_USERS_COLLECTION ?? 'users';

const client = new MongoClient(mongoUri);

try {
  await client.connect();
  const collection = client.db(dbName).collection(collectionName);
  await collection.createIndex({ username: 1 }, { unique: true });

  const passwordHash = await bcrypt.hash(password, 12);
  const now = new Date();

  const result = await collection.updateOne(
    { username },
    {
      $set: {
        username,
        passwordHash,
        role,
        siteAccess: role === 'client' ? [siteId] : [],
        active: true,
        updatedAt: now
      },
      $setOnInsert: {
        createdAt: now
      }
    },
    { upsert: true }
  );

  if (result.upsertedCount > 0) {
    console.log(`Utilisateur cree: ${username}`);
  } else {
    console.log(`Utilisateur mis a jour: ${username}`);
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Erreur add-site-user: ${message}`);
  process.exit(1);
} finally {
  await client.close();
}

async function loadEnvFile(path) {
  try {
    const content = await readFile(path, 'utf8');
    const lines = content.split(/\r?\n/);

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }

      const separator = trimmed.indexOf('=');
      if (separator <= 0) {
        continue;
      }

      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // Ignore missing env file: defaults still work.
  }
}

function normalizeUsername(value) {
  return value.trim().toLowerCase();
}

function normalizeRole(value) {
  if (value === 'admin' || value === 'client') {
    return value;
  }
  return null;
}

function normalizeSiteId(value) {
  return value.trim().toLowerCase();
}
