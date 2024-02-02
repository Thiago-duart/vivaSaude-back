import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "../../controllers/protocols";
import { LogControllerdDecorator } from "./log";

describe("log", () => {
  function makeSut() {
    class ControllerStub implements IController {
      handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        return;
      }
    }
    const controllerStub = new ControllerStub();
    const logControllerdDecorator = new LogControllerdDecorator(controllerStub);
    return {
      logControllerdDecorator,
      controllerStub,
    };
  }
  test("should call controller.handle", async () => {
    const { logControllerdDecorator, controllerStub } = makeSut();
    const controllerSpy = jest.spyOn(controllerStub, "handle");
    const httpRequest = {
      body: {},
    };
    await logControllerdDecorator.handle(httpRequest);
    expect(controllerSpy).toHaveBeenCalled();
  });
});
