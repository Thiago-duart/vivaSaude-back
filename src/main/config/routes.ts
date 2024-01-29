import { Express, Router } from "express";
import { routes } from "../routes/singUp/singUp-routes";

export const routerConfig = (app: Express) => {
  const router = Router();
  app.use("/viva", router);
  routes(router);
};
