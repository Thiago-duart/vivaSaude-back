import { mongoConnection } from "../helper/mongo-helper";
import { AccountMongoRepositore } from "./account";

describe("insert", () => {
  function makeSut() {
    const sut = new AccountMongoRepositore();
    return sut;
  }
  beforeAll(async () => {
    await mongoConnection.connect(global.__MONGO_URI__);
  });

  afterAll(async () => {
    await mongoConnection.desconect();
  });

  test("should return account if successful", async () => {
    const sut = makeSut();
    const response = await sut.add({
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    });
    expect(response.id).toBeTruthy();
    expect(response.name).toBe("valid_name");
    expect(response.email).toBe("valid_email");
    expect(response.password).toBe("valid_password");
  });
});
