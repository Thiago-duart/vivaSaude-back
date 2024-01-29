import { Request, Response, Router } from "express";

export const routes = (router: Router) => {
  router.post("/singup", (req: Request, res: Response) => {
    res.status(201).json({ id: "valid_id", name: "thiago" });
  });
};
