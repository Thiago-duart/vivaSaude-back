export interface ILogErrorRepositore {
  log(error: string): Promise<void>;
}
