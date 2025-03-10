import nodemailer, { Transporter } from "nodemailer";
import { envs } from "../../config";

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

export interface Attachement {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter: Transporter;
  constructor(
    mailService: string,
    mailerEmail: string,
    senderEmailKey: string
  ) {
    this.transporter = nodemailer.createTransport({
      service: mailService,
      auth: {
        user: mailerEmail,
        pass: senderEmailKey,
      },
    });
  }

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        from: `Hotelinking <${envs.MAILER_EMAIL}>`,
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });

      // console.log( sentInformation );

      return true;
    } catch (error) {
        console.log(error)
      return false;
    }
  }

 
}
