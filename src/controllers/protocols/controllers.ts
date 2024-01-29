import { IHttpResponse } from "./http";

export interface IController {
  handle(IHttpRequest): Promise<IHttpResponse>;
}
