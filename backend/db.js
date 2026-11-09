

import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url));


const dbFileName = process.env.DB_PATH || './cafe-db.json';
const dbFile = join(__dirname, dbFileName);


const defaultData = {
  users: [],
  otps: [],
  reservations: []
};

const adapter = new JSONFile(dbFile);
const db = new Low(adapter, defaultData);


await db.read();
await db.write();

console.log(` Database ready: ${dbFile}`);

export default db;