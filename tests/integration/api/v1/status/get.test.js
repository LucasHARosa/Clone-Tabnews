test("GET to /api/v1/status return 200", async () => {
  const res = await fetch(`http://localhost:3000/api/v1/status`);
  expect(res.status).toBe(200);
  const json = await res.json();
  //console.log(json);
  expect(json).toHaveProperty("updated_at");
  expect(json.dependecies.database.version).toEqual("16.0");
  expect(json.dependecies.database.max_connections).toEqual(100);
  expect(json.dependecies.database.connections_used).toEqual(1);
});
