import orchestrator from "@/tests/orchestrator.js";
import { version as uuidVersion } from "uuid";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET /api/v1/users/[username]", () => {
  describe("Anonymous user", () => {
    test("With exact case match", async () => {
      const res = await fetch(`http://localhost:3000/api/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "mesmoCase",
          email: "testuser@example.com",
          password: "password123",
        }),
      });

      expect(res.status).toBe(201);

      const res2 = await fetch(`http://localhost:3000/api/v1/users/mesmoCase`);

      expect(res2.status).toBe(200);
      const responseBody = await res2.json();
      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "mesmoCase",
        email: "testuser@example.com",
        password: "password123",
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
    });

    test("With different case match", async () => {
      const res = await fetch(`http://localhost:3000/api/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "CaseDiferente",
          email: "testuser2@example.com",
          password: "password123",
        }),
      });

      expect(res.status).toBe(201);

      const res2 = await fetch(
        `http://localhost:3000/api/v1/users/casediferente`,
      );

      expect(res2.status).toBe(200);
      const responseBody = await res2.json();
      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "CaseDiferente",
        email: "testuser2@example.com",
        password: "password123",
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
    });

    test("With nonexistent username", async () => {
      const res = await fetch(
        `http://localhost:3000/api/v1/users/nonexistentuser`,
      );

      expect(res.status).toBe(404);
      const responseBody = await res.json();
      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "User not found",
        action: "Please check the username",
        status_code: 404,
      });
    });
  });
});
