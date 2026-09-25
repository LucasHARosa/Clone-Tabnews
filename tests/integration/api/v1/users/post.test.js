import orchestrator from "@/tests/orchestrator.js";
import database from "@/infra/database.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/users", () => {
  describe("Anonymous user", () => {
    test("With unique and valid data", async () => {
      await database.query(
        "INSERT INTO users (username, email, password) VALUES ('testuser', 'testuser@example.com', 'password123')",
      );
      await database.query(
        "INSERT INTO users (username, email, password) VALUES ('testuser2', 'Testuser@example.com', 'password123')",
      );
      const users = await database.query("SELECT * FROM users");
      console.log("users log", users.rows);
      const res = await fetch(`http://localhost:3000/api/v1/users`, {
        method: "POST",
      });
      expect(res.status).toBe(201);
    });
  });
});
