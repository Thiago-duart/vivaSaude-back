export interface IEncrypter {
  encrypt(password: string, salt: number): Promise<string>;
}
