import orchestrator from "@/tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("POST /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const res = await fetch(`http://localhost:3000/api/v1/status`, {
        method: "POST",
      });
      expect(res.status).toBe(405);
      const json = await res.json();

      expect(json).toEqual({
        name: "MethodNotAllowedError",
        message: "Method Not Allowed",
        action: "POST not allowed",
        status_code: 405,
      });
    });
  });
});
