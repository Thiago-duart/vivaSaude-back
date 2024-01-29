import { expressAdapter } from "../../adapter/express-adapter";
import { makeSingUpExpress } from "../../factors/singUp";
import { Router } from "express";

export const routes = (router: Router) => {
  router.post("/singup", expressAdapter(makeSingUpExpress()));
};
