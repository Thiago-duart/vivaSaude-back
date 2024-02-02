import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "../../controllers/protocols";

export class LogControllerdDecorator implements IController {
  private readonly controller: IController;
  constructor(controller: IController) {
    this.controller = controller;
  }
  async handle(IHttpRequest: IHttpRequest): Promise<IHttpResponse> {
    const response = await this.controller.handle(IHttpRequest);
    return;
  }
}
