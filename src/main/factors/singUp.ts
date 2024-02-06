import { Emailconfirmation } from "../../utils/emailConfirm/EmailConfirm";
import { SingUpController } from "../../controllers/controller/singUp/SingUp";
import { DbAddAccount } from "../../data/usecases/db_add_account/DbAddAccount";
import { EncrypterAdapter } from "../../infra/cryptography/Encrypter.adapter";
import { AccountMongoRepositore } from "../../infra/mongodb/account-repositore/account";
import { EmailValidatorAdapter } from "../../utils";
import { LogControllerdDecorator } from "../decorators/log";
import { LogMongoRepositore } from "../../infra/mongodb/log-repositore/log-error";

export const makeSingUpExpress = (): any => {
  const emailValidator = new EmailValidatorAdapter();
  const encrypter = new EncrypterAdapter(12);
  const addAccountRepositore = new AccountMongoRepositore();
  const dbAddAccount = new DbAddAccount(encrypter, addAccountRepositore);
  const logMongoRepositore = new LogMongoRepositore();
  const singUp = new SingUpController(emailValidator, dbAddAccount);
  return new LogControllerdDecorator(singUp, logMongoRepositore);
};
