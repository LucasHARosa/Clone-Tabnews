import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js"

export default async function migrations(req, res) {
  const dbClient = await database.getNewClient()
  const defaultMigrationOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: "DATABASE_URL not set" });
  }

  if (req.method === "POST") {
    console.log("Running migrations...");
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });

    await dbClient.end()

    if (migratedMigrations.length > 0) {
      return res.status(201).json(migratedMigrations);
    }

    res.status(200).json(migratedMigrations);
  }

  if (req.method === "GET") {
    console.log("Fetching migrations...");
    const pendingMigrations = await migrationRunner(defaultMigrationOptions);
    await dbClient.end()
    res.status(200).json(pendingMigrations);
  }
}
