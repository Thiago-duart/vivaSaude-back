import request from "supertest";
import app from "../../config/app";
describe("singUp-routes", () => {
  test("should return status 201 and account data", async () => {
    await request(app)
      .post("/viva/singup")
      .send({
        name: "thiago",
        email: "td1405150@gmail.com",
        password: "valid_password",
      })
      .expect({ id: "valid_id", name: "thiago" })
      .expect(201);
  });
});
