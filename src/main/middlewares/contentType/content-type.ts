import { NextFunction, Request, Response } from "express";

export const contentType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.type("json");
  //   res.setHeader("content-type", "application/json; charset=utf-8");
  next();
};
