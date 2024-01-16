import { Encrypter } from "./Encrypter.adapter";
import bcrypt from "bcrypt";
describe("Encrypter.adapter", () => {
  function makeSut() {
    const sut = new Encrypter();
    return {
      sut,
    };
  }

  test("should hash is called with the passed parameters", async () => {
    const { sut } = makeSut();
    const hashSpy = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("any_value", 10);
    expect(hashSpy).toHaveBeenCalledWith("any_value", 10);
  });
});
