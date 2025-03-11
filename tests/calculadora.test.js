const calculadora = require("../models/calculadora.js");

test("soma 1 + 2 = 3", () => {
  expect(calculadora.somar(1, 2)).toBe(3);
});

test("soma -1 + 1 = 0", () => {
  expect(calculadora.somar(-1, 1)).toBe(0);
});

test("soma banana", () => {
  expect(calculadora.somar("banana", 1)).toBeNaN();
});
