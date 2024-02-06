export interface IEmailConfirmation {
  confirm(fromEmail: string, ToEmail: string): Promise<boolean>;
}
