import { Twilio } from "twilio";

import { configs } from "../configs";
import { smsTemplates } from "../constants";
import { ESmsActionsEnum } from "../enums";

class SmsService {
  constructor(
    private client = new Twilio(
      configs.TWILIO_ACCOUNT_SID,
      configs.TWILIO_AUTH_TOKEN
    )
  ) {}

  public async sendSms(phone: string, smsAction: ESmsActionsEnum) {
    try {
      const message = smsTemplates[smsAction];

      await this.client.messages.create({
        body: message,
        to: phone,
        // from: "+17076752164",
        messagingServiceSid: configs.TWILIO_SERVICE_SID,
      });
    } catch (e) {
      console.error(JSON.stringify(e, null, 2));
    }
  }
}

export const smsService = new SmsService();
