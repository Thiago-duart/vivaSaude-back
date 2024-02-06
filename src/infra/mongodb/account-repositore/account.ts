import { IAddAccountRepositore } from "@/data/protocols";
import { IAccountModel, IAccount } from "@/domain";
import { mongoConnection } from "../helper/mongo-helper";

export class AccountMongoRepositore implements IAddAccountRepositore {
  async add(data: IAccountModel): Promise<IAccount> {
    const accountCollection = await mongoConnection.getCollection("accounts");
    const response = await accountCollection.insertOne(data);
    const { _id, ...accountData } = await accountCollection.findOne({
      _id: response.insertedId,
    });

    return {
      id: _id.toString(),
      name: accountData.name,
      email: accountData.email,
      password: accountData.password,
    };
  }
}
