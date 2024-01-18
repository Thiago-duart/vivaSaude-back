import { IAccount, IAccountModel } from "../../domain";

export interface IAddAccountRepositore {
  add(data: IAccountModel): Promise<IAccount>;
}
