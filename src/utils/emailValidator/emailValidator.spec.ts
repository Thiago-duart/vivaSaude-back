import { EmailValidatorAdapter } from "./EmailValidator.adapter";

describe("EmailValidator.adapter", () => {
  function makeSut() {
    const sut = new EmailValidatorAdapter();
    return sut;
  }
  test("if passed invalid email expect return false", () => {
    const sut = makeSut();
    const email = "invalid_email";
    const response = sut.isValid(email);
    expect(response).toBe(false);
  });
});
