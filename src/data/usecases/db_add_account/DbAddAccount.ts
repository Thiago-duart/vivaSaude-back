import { IAddAccountRepositore, IEncrypter } from "data/protocols";
import { IAccount, IAccountModel, IAddAccount } from "domain";

export class DbAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter;
  private readonly addAccountRepositore: IAddAccountRepositore;
  constructor(
    encrypter: IEncrypter,
    addAccountRepositore: IAddAccountRepositore
  ) {
    this.encrypter = encrypter;
    this.addAccountRepositore = addAccountRepositore;
  }
  async add(data: IAccountModel): Promise<IAccount> {
    const passwordHash = await this.encrypter.encrypt(data.password);
    const account = await this.addAccountRepositore.add(
      Object.assign({}, data, { password: passwordHash })
    );
    return account;
  }
}
