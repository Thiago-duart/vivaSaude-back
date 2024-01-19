import { Collection, MongoClient } from "mongodb";

export const mongoConnection = {
  client: null as MongoClient,

  async connect(url: any) {
    this.client = await MongoClient.connect(global.__MONGO_URI__);
  },
  async desconect() {
    await this.client.close();
  },
  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },
};
