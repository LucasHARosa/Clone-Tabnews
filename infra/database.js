import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    database: "postgres",
    password: "mypassword",
  });
  await client.connect();
  const res = await client.query(queryObject);
  await client.end();
  return res;
}

export default {
  query: query,
};
