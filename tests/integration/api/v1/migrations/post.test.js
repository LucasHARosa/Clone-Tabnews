import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public");
});

test("POST to /api/v1/migrations return 200", async () => {
  const res = await fetch(`http://localhost:3000/api/v1/migrations`, {
    method: "POST",
  });
  expect(res.status).toBe(201);
  const responseBody = await res.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
