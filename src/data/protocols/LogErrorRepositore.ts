export interface ILogErrorRepositore {
  logError(error: string): Promise<void>;
}
