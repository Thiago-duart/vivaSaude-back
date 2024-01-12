import { badRequest, ok, serverError } from "../../helper";
import {
  IEmailValidator,
  IHttpRequest,
  IHttpResponse,
  ISingUp,
} from "../../protocols";
import {
  InvalidParamError,
  MissingParamError,
  ServerError,
} from "../../errors";
import { IAddAccount } from "domain";

export class SingUpController implements ISingUp {
  private readonly emailValidator: IEmailValidator;
  private readonly addAccount: IAddAccount;
  constructor(emailValidator: IEmailValidator, addAccount: IAddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
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

      const responseAddAccount = await this.addAccount.add(request.body);

      return ok(responseAddAccount);
    } catch (error) {
      return serverError(new ServerError());
    }
  }
}
