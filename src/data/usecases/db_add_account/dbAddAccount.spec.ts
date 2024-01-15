import { IEncrypter } from "data/protocols";
import { DbAddAccount } from "./DbAddAccount";

describe("DbAddAccount", () => {
  function makeSut() {
    class EncrypterStub implements IEncrypter {
      async encrypt(password: string): Promise<string> {
        return "password_hash";
      }
    }
    const encrypter = new EncrypterStub();
    const sut = new DbAddAccount(encrypter);
    return {
      encrypter,
      sut,
    };
  }
  test("should encypter is called with the passed parameters", () => {
    const { sut, encrypter } = makeSut();
    const encrypterSpy = jest.spyOn(encrypter, "encrypt");
    const data = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    sut.add(data);
    expect(encrypterSpy).toHaveBeenCalledWith(data.password);
  });
});
