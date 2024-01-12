import { IAccount } from "domain/models/account";

export interface IAccountModel {
  name: string;
  email: string;
  password: string;
}
export interface IAddAccount {
  add(data: IAccountModel): IAccount;
}
