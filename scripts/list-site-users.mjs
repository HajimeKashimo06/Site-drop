import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { MongoClient } from 'mongodb';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const apiEnvPath = resolve(projectRoot, 'apps', 'api', '.env');

await loadEnvFile(apiEnvPath);

const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017';
const dbName = process.env.MONGO_DB_NAME ?? 'sitedrop';
const collectionName = process.env.MONGO_USERS_COLLECTION ?? 'users';

const client = new MongoClient(mongoUri);

try {
  await client.connect();
  const collection = client.db(dbName).collection(collectionName);
  const users = await collection
    .find(
      {},
      { projection: { _id: 0, username: 1, role: 1, active: 1, siteAccess: 1, createdAt: 1, updatedAt: 1 } }
    )
    .sort({ username: 1 })
    .toArray();

  if (users.length === 0) {
    console.log('Aucun utilisateur.');
    process.exit(0);
  }

  for (const user of users) {
    const createdAt = user.createdAt instanceof Date ? user.createdAt.toISOString() : String(user.createdAt ?? '');
    const updatedAt = user.updatedAt instanceof Date ? user.updatedAt.toISOString() : String(user.updatedAt ?? '');
    const role = user.role === 'admin' ? 'admin' : 'client';
    const siteId =
      Array.isArray(user.siteAccess) && user.siteAccess.length > 0 ? String(user.siteAccess[0] ?? '') : '-';
    console.log(
      `${user.username} | role=${role} | site=${siteId} | active=${user.active !== false} | created=${createdAt} | updated=${updatedAt}`
    );
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Erreur list-site-users: ${message}`);
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
