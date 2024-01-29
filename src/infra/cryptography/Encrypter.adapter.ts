import { IEncrypter } from "data/protocols";
import bcrypt from "bcrypt";

export class EncrypterAdapter implements IEncrypter {
  private readonly salt: number;
  constructor(salt: number) {
    this.salt = salt;
  }
  async encrypt(password: string): Promise<string> {
    const passwordHash = await bcrypt.hash(password, this.salt);
    return passwordHash;
  }
}
