export class ServerError extends Error {
  constructor(stack: string) {
    super("Ouve um erro interno");
    this.name = "ServerError";
    this.stack = stack;
  }
}
