import orchestrator from "@/tests/orchestrator.js";
import { version as uuidVersion } from "uuid";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/users", () => {
  describe("Anonymous user", () => {
    test("With unique and valid data", async () => {
      const res = await fetch(`http://localhost:3000/api/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "testuser",
          email: "testuser@example.com",
          password: "password123",
        }),
      });

      expect(res.status).toBe(201);
      const responseBody = await res.json();
      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
    });

    test("Duplicate user 'email'", async () => {
      await fetch(`http://localhost:3000/api/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "emailduplicado1",
          email: "emailDuplicado@example.com",
          password: "password123",
        }),
      });

      const res2 = await fetch(`http://localhost:3000/api/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "emailduplicado2",
          email: "EmailDuplicado@example.com",
          password: "password123",
        }),
      });

      expect(res2.status).toBe(400);
      const responseBody2 = await res2.json();
      expect(responseBody2).toEqual({
        name: "ValidationError",
        message: "Email already exists",
        status_code: 400,
        action: "Please use a different email",
      });
    });

    test("Duplicate user 'username'", async () => {
      await fetch(`http://localhost:3000/api/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "userduplicado",
          email: "userduplicado1@example.com",
          password: "password123",
        }),
      });

      const res2 = await fetch(`http://localhost:3000/api/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "userduplicado",
          email: "userduplicado2@example.com",
          password: "password123",
        }),
      });

      expect(res2.status).toBe(400);
      const responseBody2 = await res2.json();
      expect(responseBody2).toEqual({
        name: "ValidationError",
        message: "Username already exists",
        status_code: 400,
        action: "Please use a different username",
      });
    });
  });
});
