import { Collection } from "mongodb";
import { mongoConnection } from "../helper/mongo-helper";
import { LogMongoRepositore } from "./log-error";

describe("log-error", () => {
  function makeSut() {
    const sut = new LogMongoRepositore();
    return sut;
  }
  let collections: Collection;
  beforeAll(async () => {
    await mongoConnection.connect(global.__MONGO_URI__);
  });

  afterAll(async () => {
    await mongoConnection.desconect();
  });

  beforeEach(async () => {
    collections = await mongoConnection.getCollection("logs");
    await collections.deleteMany({});
  });
  test("should create a log of an error in the database if you hear a 500 error", async () => {
    const sut = makeSut();
    await sut.logError("any_error");
    const count = await collections.countDocuments();
    expect(count).toBe(1);
  });
});
