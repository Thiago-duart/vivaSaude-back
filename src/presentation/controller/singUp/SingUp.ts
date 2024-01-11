import { badRequest } from "../../helper";
import { IHttpRequest, IHttpResponse, ISingUp } from "../../protocols";
import { MissingParamError } from "../../errors";

export class SingUpController implements ISingUp {
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const data = ["email", "name", "password"];
    for (let value of data) {
      if (!request.body[value]) {
        return badRequest(new MissingParamError(value));
      }
    }
  }
}
