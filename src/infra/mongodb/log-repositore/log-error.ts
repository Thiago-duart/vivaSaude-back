import { ILogErrorRepositore } from "@/data/protocols";
import { mongoConnection } from "../helper/mongo-helper";

export class LogMongoRepositore implements ILogErrorRepositore {
  async logError(error: string): Promise<void> {
    const errorCollection = await mongoConnection.getCollection("logs");
    await errorCollection.insertOne({ error, date: new Date() });
  }
}
