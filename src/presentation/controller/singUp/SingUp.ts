import { IHttpRequest, IHttpResponse, ISingUp } from "../protocols";

export class SingUp implements ISingUp {
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    return {
      statusCode: 400,
      body: new Error("missing param: name"),
    };
  }
}
