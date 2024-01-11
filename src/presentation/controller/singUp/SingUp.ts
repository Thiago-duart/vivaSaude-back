import { badRequest } from "../../helper";
import {
  IEmailValidator,
  IHttpRequest,
  IHttpResponse,
  ISingUp,
} from "../../protocols";
import { InvalidParamError, MissingParamError } from "../../errors";

export class SingUpController implements ISingUp {
  private readonly emailValidator: IEmailValidator;
  constructor(emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator;
  }
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const data = ["email", "name", "password"];
    for (let value of data) {
      if (!request.body[value]) {
        return badRequest(new MissingParamError(value));
      }
    }
    const { email } = request.body;
    const isValid = this.emailValidator.isValid(email);
    if (!isValid) {
      return badRequest(new InvalidParamError("email"));
    }
  }
}
