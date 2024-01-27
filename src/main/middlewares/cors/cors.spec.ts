import request from "supertest";
import app from "../../config/app";
describe("enable-cors", () => {
  test("should enable-cors", async () => {
    app.get("/enable-cors", (req, res) => {
      res.send();
    });
    await request(app)
      .get("/enable-cors")
      .expect("access-control-allow-origin", "*");
  });
});
