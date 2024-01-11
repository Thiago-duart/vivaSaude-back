import { IHttpRequest, IHttpResponse, ISingUp } from "../protocols";

export class SingUp implements ISingUp {
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const data = ["email", "name", "password"];
    for (let value of data) {
      if (!request.body[value]) {
        return {
          statusCode: 400,
          body: new Error(`Missing param: ${value}`),
        };
      }
    }
  }
}
