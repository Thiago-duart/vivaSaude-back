import { IHttpResponse } from "./http";

export interface ISingUp {
  handle(IHttpRequest): Promise<IHttpResponse>;
}
