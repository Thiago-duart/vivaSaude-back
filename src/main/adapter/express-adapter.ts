import { Request, Response } from "express";
import { IController } from "@/controllers/protocols";

export const expressAdapter = (controller: IController) => {
  return async (req: Request, res: Response): Promise<void> => {
    const httpRequest = {
      body: req.body,
    };
    const response = await controller.handle(httpRequest);
    res.status(response.statusCode).json(response.body);
  };
};
