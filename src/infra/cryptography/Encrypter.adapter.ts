import { IEncrypter } from "data/protocols";
import bcrypt from "bcrypt";

export class Encrypter implements IEncrypter {
  async encrypt(password: string, salt: number): Promise<string> {
    const passwordHash = await bcrypt.hash(password, 10);
    return;
  }
}
