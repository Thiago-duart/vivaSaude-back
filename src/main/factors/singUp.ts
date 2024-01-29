import { SingUpController } from "../../controllers/controller/singUp/SingUp";
import { DbAddAccount } from "../../data/usecases/db_add_account/DbAddAccount";
import { EncrypterAdapter } from "../../infra/cryptography/Encrypter.adapter";
import { AccountMongoRepositore } from "../../infra/mongodb/account-repositore/account";
import { EmailValidatorAdapter } from "../../utils";

export const makeSingUpExpress = (): SingUpController => {
  const emailValidator = new EmailValidatorAdapter();
  const encrypter = new EncrypterAdapter(12);
  const addAccountRepositore = new AccountMongoRepositore();
  const dbAddAccount = new DbAddAccount(encrypter, addAccountRepositore);
  return new SingUpController(emailValidator, dbAddAccount);
};
