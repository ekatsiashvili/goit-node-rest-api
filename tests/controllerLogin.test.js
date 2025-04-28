import { jest, expect } from "@jest/globals";

// Мокаємо сервіс до імпорту контролер
jest.unstable_mockModule("../services/authService.js", () => ({
  // Цей об'єкт буде доступний у контролері у момент виклику функції сервісу 'loginUser'
  loginUser: jest.fn().mockResolvedValue({
    id: 1,
    token: "dummy_token",
    email: "dummy@example.com",
    subscription: "starter",
  }),
}));

// Динамічно імпортуємо модуль після налаштування моків
const { loginUser: loginController } = await import(
  "../controllers/authControllers.js"
);

describe("Login user", () => {
  test("should login user", async () => {
    // Створюємо мок-об’єкт для res
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    // Створюємо req об’єкт
    // Контент змінних не важливий, адже ми мокаємо сервіс
    const req = {
      body: {
        email: "dummy@example.com",
        password: "111",
      },
    };

    // Викликаємо контролер
    await loginController(req, res);

    // Перевіряємо, що res.status був викликаний із 200
    expect(res.status).toHaveBeenCalledWith(200);

    // Перевіряємо, що в відповіді є токен і user з полями email та subscription типу String
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          email: expect.any(String),
          subscription: expect.any(String),
        }),
      })
    );
  });
});
