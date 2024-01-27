import request from "supertest";
import app from "../../config/app";
describe("content-type", () => {
  test("should return content-type tobe json", async () => {
    console.log("Content-Type", /json/);
    app.get("/content-type", (req, res) => {
      res.send();
    });
    await request(app).get("/content-type").expect("Content-Type", /json/);
  });
});
