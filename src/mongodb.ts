// ./mongodb.ts

import { Db, MongoClient, MongoClientOptions } from "mongodb";
import { formatLog } from "./utils";

// Create cached connection variable
let cachedDB: Db | null = null;

// A function for connecting to MongoDB,
export default async function connectToDatabase(): Promise<Db> {
  // If the database connection is cached, use it instead of creating a new connection
  if (cachedDB) {
    console.info(formatLog("Using cached client!"));
    return cachedDB;
  }
  const opts = {} satisfies MongoClientOptions;
  console.info(formatLog("No client found! Creating a new one."));
  // If no connection is cached, create a new one
  const client = new MongoClient(process.env.MONGODB_URI as string, opts);
  await client.connect();
  const db: Db = client.db(process.env.DB_NAME);
  cachedDB = db;
  return cachedDB;
}
