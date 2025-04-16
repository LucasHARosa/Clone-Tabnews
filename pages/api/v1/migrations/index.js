import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: "DATABASE_URL not set" });
  }
  if (req.method === "POST") {
    console.log("Running migrations...");
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: false,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });
    res.status(200).json(migrations);
  }

  if (req.method === "GET") {
    console.log("Fetching migrations...");
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });
    res.status(200).json(migrations);
  }
}
