import { badRequest, created, serverError } from "../../helper";
import {
  IController,
  IEmailValidator,
  IHttpRequest,
  IHttpResponse,
} from "../../protocols";
import {
  InvalidParamError,
  MissingParamError,
  ServerError,
} from "../../errors";
import { IAddAccount } from "@/domain";

export class SingUpController implements IController {
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

      const { id, name } = await this.addAccount.add(request.body);

      return created({ id, name });
    } catch (error) {
      return serverError(error);
    }
  }
}
