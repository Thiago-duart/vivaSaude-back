import request from "supertest";
import app from "../../config/app";
import { mongoConnection } from "../../../infra/mongodb/helper/mongo-helper";
describe("singUp-routes", () => {
  beforeAll(async () => {
    await mongoConnection.connect(global.__MONGO_URI__);
  });

  afterAll(async () => {
    await mongoConnection.desconect();
  });

  beforeEach(async () => {
    const collections = await mongoConnection.getCollection("accounts");
    await collections.deleteMany({});
  });
  test("should return status 201 and account data", async () => {
    await request(app)
      .post("/viva/singup")
      .send({
        name: "thiago",
        email: "td1405150@gmail.com",
        password: "valid_password",
      })
      .expect(201);
  });
});
