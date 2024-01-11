import { SingUp } from "./SingUp";

describe("singUp controller", () => {
  function makeSut() {
    const sut = new SingUp();
    return sut;
  }
  test("should return 400 if name is not provided", async () => {
    const sut = makeSut();
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
    const sut = makeSut();
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
    const sut = makeSut();
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
});
