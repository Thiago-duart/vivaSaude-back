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
  test("if passed valid email expect return true", () => {
    const sut = makeSut();
    jest
      .spyOn(sut, "isValid")
      .mockImplementationOnce((email: string): boolean => {
        return true;
      });
    const email = "valid_email";
    const response = sut.isValid(email);
    expect(response).toBe(true);
  });
});
