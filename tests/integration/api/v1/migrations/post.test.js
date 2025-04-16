test("POST to /api/v1/migrations return 200", async () => {
  const res = await fetch(`http://localhost:3000/api/v1/migrations`, {
    method: "POST",
  });
  expect(res.status).toBe(200);
  const responseBody = await res.json();
  console.log(responseBody);
  expect(Array.isArray(responseBody)).toBe(true);
});
