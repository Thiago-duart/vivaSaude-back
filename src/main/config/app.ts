import express from "express";
import { middlewaresConfig } from "./middlewares";
import { routerConfig } from "./routes";

const app = express();
middlewaresConfig(app);
routerConfig(app);
export default app;
