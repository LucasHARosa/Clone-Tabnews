import database from "@/infra/database.js";
import { InternalServerError, MethodNotAllowedError } from "@/infra/errors.js";
import { createRouter } from "next-connect";

const router = createRouter();

router.get(status);

export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandler,
});

function onErrorHandler(err, req, res) {
  const publicErrorObject = new InternalServerError({ cause: err });
  console.error(publicErrorObject);
  res.status(500).json(publicErrorObject);
}

function onNoMatchHandler(req, res) {
  const publicErrorObject = new MethodNotAllowedError();
  res.status(405).json(publicErrorObject);
}

async function status(req, res) {
  const updateAt = new Date().toISOString();
  const versionDatabase = await database.query("SHOW server_version;");
  const versionDatabaseValue = versionDatabase.rows[0].server_version;
  const maxConections = await database.query("SHOW max_connections;");
  const maxConectionsValue = maxConections.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const connectionsUsed = await database.query({
    text: `
      SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1;
    `,
    values: [databaseName],
  });

  const connectionsUsedValue = connectionsUsed.rows[0].count;
  res.status(200).json({
    updated_at: updateAt,
    dependecies: {
      database: {
        version: versionDatabaseValue,
        max_connections: parseInt(maxConectionsValue),
        connections_used: connectionsUsedValue,
      },
    },
  });
}
