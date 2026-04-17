import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { MongoClient } from 'mongodb';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const apiEnvPath = resolve(projectRoot, 'apps', 'api', '.env');

await loadEnvFile(apiEnvPath);

const [rawUsername] = process.argv.slice(2);
const username = normalizeUsername(rawUsername ?? '');

if (!username) {
  console.error('Usage: node scripts/disable-site-user.mjs <identifiant>');
  process.exit(1);
}

const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017';
const dbName = process.env.MONGO_DB_NAME ?? 'sitedrop';
const collectionName = process.env.MONGO_USERS_COLLECTION ?? 'users';

const client = new MongoClient(mongoUri);

try {
  await client.connect();
  const collection = client.db(dbName).collection(collectionName);
  const result = await collection.updateOne(
    { username },
    {
      $set: {
        active: false,
        updatedAt: new Date()
      }
    }
  );

  if (result.matchedCount === 0) {
    console.log(`Utilisateur introuvable: ${username}`);
    process.exit(0);
  }

  console.log(`Utilisateur desactive: ${username}`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Erreur disable-site-user: ${message}`);
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
