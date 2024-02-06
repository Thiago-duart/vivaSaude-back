import { IEmailConfirmation } from "@/controllers/protocols";
import nodemiler from "nodemailer";
export class Emailconfirmation implements IEmailConfirmation {
  async confirm(fromEmail: string, ToEmail: string): Promise<boolean> {
    const transporter = nodemiler.createTransport({
      service: process.env.Service,
      auth: {
        user: process.env.Email,
        pass: process.env.AppPass,
      },
    });
    const info = await transporter.sendMail({
      from: `"VivaSaude 🥗" <${ToEmail}>`,
      to: `${fromEmail}`,
      subject: "oi ✔",
      text: "Em breve",
      html: `Em breve`,
    });
    return true;
  }
}
