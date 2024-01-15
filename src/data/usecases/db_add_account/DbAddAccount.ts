import { IEncrypter } from "data/protocols";
import { IAccount, IAccountModel, IAddAccount } from "domain";

export class DbAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter;
  constructor(encrypter: IEncrypter) {
    this.encrypter = encrypter;
  }
  async add(data: IAccountModel): Promise<IAccount> {
    const passwordHash = await this.encrypter.encrypt(data.password);
    return;
  }
}
