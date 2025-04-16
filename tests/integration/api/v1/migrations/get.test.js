test("GET to /api/v1/migrations return 200", async () => {
  const res = await fetch(`http://localhost:3000/api/v1/migrations`);
  expect(res.status).toBe(200);
  
});


