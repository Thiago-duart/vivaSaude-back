import { InvalidParamError, ServerError } from "../../errors";
import { SingUpController } from "./SingUp";
import { IAddAccount, IAccountModel, IAccount } from "../../../domain";
import { IEmailValidator } from "@/controllers/protocols";

describe("singUp controller", () => {
  function makeSut() {
    class AddAccountStub implements IAddAccount {
      async add(data: IAccountModel): Promise<IAccount> {
        const newAccount = {
          id: "valid_id",
          name: "valid_name",
          email: "valid_email",
          password: "valid_password",
        };
        return newAccount;
      }
    }
    class EmailValidatorStub implements IEmailValidator {
      isValid(email: string): boolean {
        return true;
      }
    }
    const emailValidator = new EmailValidatorStub();
    const addAccount = new AddAccountStub();
    const sut = new SingUpController(emailValidator, addAccount);
    return { emailValidator, sut, addAccount };
  }
  test("should return 400 if name is not provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "valid_email",
        password: "valid_password",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Missing param: name"));
  });
  test("should return 400 if email is not provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "valid_name",
        password: "valid_password",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Missing param: email"));
  });
  test("should return 400 if password is not provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "valid_name",
        email: "valid_email",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Missing param: password"));
  });
  test("should return 400 if email is not valid", async () => {
    const { sut, emailValidator } = makeSut();
    jest.spyOn(emailValidator, "isValid").mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        name: "valid_name",
        email: "invalid_email",
        password: "valid_password",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });
  test("should emailValidator is called with the passed parameters", async () => {
    const { sut, emailValidator } = makeSut();
    const isValid = jest
      .spyOn(emailValidator, "isValid")
      .mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        name: "valid_name",
        email: "valid_email",
        password: "valid_password",
      },
    };
    await sut.handle(httpRequest);
    expect(isValid).toHaveBeenCalledWith("valid_email");
  });
  test("should return 500 if isValid return exception", async () => {
    const { sut, emailValidator } = makeSut();
    jest.spyOn(emailValidator, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        name: "valid_name",
        email: "valid_email",
        password: "valid_password",
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
  test("should addAccount is called with the passed parameters", async () => {
    const { sut, addAccount } = makeSut();
    const addSpy = jest.spyOn(addAccount, "add");
    const httpRequest = {
      body: {
        name: "valid_name",
        email: "valid_email",
        password: "valid_password",
      },
    };
    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body);
  });
  test("should return 500 if add return exception", async () => {
    const { sut, addAccount } = makeSut();
    jest
      .spyOn(addAccount, "add")
      .mockImplementationOnce(
        async (data: IAccountModel): Promise<IAccount> => {
          throw new Error();
        }
      );
    const httpRequest = {
      body: {
        name: "valid_name",
        email: "valid_email",
        password: "valid_password",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
  test("should return 201 if the account is created", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "valid_name",
        email: "valid_email",
        password: "valid_password",
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(201);
    const { name } = httpRequest.body;
    expect(httpResponse.body).toEqual({ name, id: "valid_id" });
  });
});
