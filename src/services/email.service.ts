import EmailTemplates from "email-templates";
import nodemailer, { Transporter } from "nodemailer";
import * as path from "path";

import { configs } from "../configs";
import { allTemplates } from "../constants/email.constants";
import { EEmailActions } from "../enums/email.enum";

class EmailService {
  private transporter: Transporter;
  private templateParser;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail ",
      auth: {
        user: configs.NO_REPLAY_EMAIL,
        pass: configs.NO_REPLAY_EMAIL_PASSWORD,
      },
    });

    this.templateParser = new EmailTemplates({
      views: {
        root: path.join(process.cwd(), "src", "static"),
        options: {
          extension: "hbs",
        },
      },
      juice: true,
      juiceResources: {
        webResources: {
          relativeTo: path.join(process.cwd(), "src", "static", "css"),
        },
      },
    });
  }

  public async sendMail(email: string, emailAction: EEmailActions) {
    const templateInfo = allTemplates[emailAction];

    const html = await this.templateParser.render(templateInfo.templateName);

    return this.transporter.sendMail({
      from: "No reply",
      to: email,
      subject: templateInfo.subject,
      html,
    });
  }
}

export const emailService = new EmailService();
