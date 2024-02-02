import { mongoConnection as sut } from "./mongo-helper";
describe("mongo-help", () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL);
  });
  afterAll(async () => {
    await sut.desconect();
  });
  test("should try to connect if mongoConnection.getCollection is null ", async () => {
    let collection = await sut.getCollection("accounts");
    expect(collection).toBeTruthy();
    await sut.desconect();
    collection = await sut.getCollection("accounts");
    expect(collection).toBeTruthy();
  });
});
