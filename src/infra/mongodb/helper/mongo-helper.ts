import { Collection, MongoClient } from "mongodb";

export const mongoConnection = {
  client: null as MongoClient,
  url: null as string,
  async connect(url: any) {
    this.url = url;
    this.client = await MongoClient.connect(url);
  },
  async desconect() {
    await this.client.close();
    this.client = null;
  },
  async getCollection(name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.url);
    }
    return this.client.db().collection(name);
  },
};
