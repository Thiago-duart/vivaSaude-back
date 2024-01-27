import { Express } from "express";
import { bodyParse, configCors, contentType } from "../middlewares";
export const middlewaresConfig = (app: Express) => {
  app.use(bodyParse);
  app.use(contentType);
  app.use(configCors);
};
