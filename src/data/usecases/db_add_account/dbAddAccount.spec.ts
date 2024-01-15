import { IAddAccountRepositore, IEncrypter } from "data/protocols";
import { DbAddAccount } from "./DbAddAccount";
import { IAccountModel, IAccount } from "domain";

describe("DbAddAccount", () => {
  function makeSut() {
    class EncrypterStub implements IEncrypter {
      async encrypt(password: string): Promise<string> {
        return "hash_password";
      }
    }
    class AddAccountRepositoreStub implements IAddAccountRepositore {
      async add(data: IAccountModel): Promise<IAccount> {
        return {
          id: "valid_id",
          name: "valid_name",
          email: "valid_email",
          password: "hash_password",
        };
      }
    }
    const addAccountRepositore = new AddAccountRepositoreStub();
    const encrypter = new EncrypterStub();
    const sut = new DbAddAccount(encrypter, addAccountRepositore);
    return {
      encrypter,
      sut,
      addAccountRepositore,
    };
  }
  test("should encypter is called with the passed parameters", async () => {
    const { sut, encrypter } = makeSut();
    const encrypterSpy = jest.spyOn(encrypter, "encrypt");
    const data = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    await sut.add(data);
    expect(encrypterSpy).toHaveBeenCalledWith(data.password);
  });
  test("should addAccountRepositore is called with the passed parameters", async () => {
    const { sut, addAccountRepositore } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositore, "add");
    const data = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    await sut.add(data);
    expect(addSpy).toHaveBeenCalledWith({
      name: "valid_name",
      email: "valid_email",
      password: "hash_password",
    });
  });
});
