import { EncrypterAdapter } from "./Encrypter.adapter";
import bcrypt from "bcrypt";

describe("Encrypter.adapter", () => {
  function makeSut(salt: number) {
    const sut = new EncrypterAdapter(salt);
    return {
      sut,
    };
  }
  test("should hash is called with the passed parameters", async () => {
    const { sut } = makeSut(12);
    const hashSpy = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("any_value");
    expect(hashSpy).toHaveBeenCalledWith("any_value", 12);
  });

  test("case returns a correct hash", async () => {
    const { sut } = makeSut(12);
    jest
      .spyOn(sut, "encrypt")
      .mockImplementationOnce(async (password: string): Promise<string> => {
        return "any_value";
      });
    const hash = await sut.encrypt("any_value");
    expect(hash).toBe("any_value");
  });
});
