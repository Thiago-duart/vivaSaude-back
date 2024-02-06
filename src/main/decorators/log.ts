import { ILogErrorRepositore } from "../../data/protocols";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "../../controllers/protocols";

export class LogControllerdDecorator implements IController {
  private readonly controller: IController;
  private readonly logErrorRepositore: ILogErrorRepositore;
  constructor(
    controller: IController,
    logErrorRepositore: ILogErrorRepositore
  ) {
    this.controller = controller;
    this.logErrorRepositore = logErrorRepositore;
  }
  async handle(IHttpRequest: IHttpRequest): Promise<IHttpResponse> {
    const response = await this.controller.handle(IHttpRequest);
    if (response.statusCode == 500) {
      await this.logErrorRepositore.logError(response.body?.stack);
    }
    return response;
  }
}
