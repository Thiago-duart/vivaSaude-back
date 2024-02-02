import { serverError } from "../../controllers/helper";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "../../controllers/protocols";
import { ILogErrorRepositore } from "../../data/protocols";
import { LogControllerdDecorator } from "./log";

describe("log", () => {
  function makeSut() {
    class LogErrorRepositoreStub implements ILogErrorRepositore {
      async log(error: string): Promise<any> {
        return;
      }
    }
    class ControllerStub implements IController {
      handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        const fakeResponse: IHttpResponse = {
          statusCode: 200,
          body: { name: "thiago" },
        };
        return new Promise((Resolve) => Resolve(fakeResponse));
      }
    }
    const logErrorRepositoreStub = new LogErrorRepositoreStub();
    const controllerStub = new ControllerStub();
    const logControllerdDecorator = new LogControllerdDecorator(
      controllerStub,
      logErrorRepositoreStub
    );
    return {
      logErrorRepositoreStub,
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
  test("should call LogErrorRepositore if controller handle returns serverError", async () => {
    const { logControllerdDecorator, logErrorRepositoreStub, controllerStub } =
      makeSut();
    const fakeError = new Error();
    fakeError.stack = "fake_error";
    const logSpy = jest.spyOn(logErrorRepositoreStub, "log");
    jest
      .spyOn(controllerStub, "handle")
      .mockImplementationOnce(
        async (httpRequest: IHttpRequest): Promise<IHttpResponse> => {
          return serverError(fakeError);
        }
      );
    const httpRequest = {
      body: {},
    };
    await logControllerdDecorator.handle(httpRequest);
    expect(logSpy).toHaveBeenCalledWith("fake_error");
  });
});
