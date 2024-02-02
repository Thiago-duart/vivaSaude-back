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
        const fakeResponse: IHttpResponse = {
          statusCode: 200,
          body: { name: "thiago" },
        };
        return new Promise((Resolve) => Resolve(fakeResponse));
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
  test("should return the same as the controller returns", async () => {
    const { logControllerdDecorator } = makeSut();
    const httpRequest = {
      body: {},
    };
    const httpResponse: IHttpResponse = {
      statusCode: 200,
      body: { name: "thiago" },
    };
    const response = await logControllerdDecorator.handle(httpRequest);
    expect(response).toEqual(httpResponse);
  });
});
