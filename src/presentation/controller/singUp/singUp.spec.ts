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
    expect(httpResponse.body).toEqual(new Error("missing param: name"));
  });
});
