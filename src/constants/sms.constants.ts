import { ESmsActionsEnum } from "../enums";

export const smsTemplates: { [key: string]: string } = {
  [ESmsActionsEnum.WELCOME]: "Great to see you in our app!",

  [ESmsActionsEnum.FORGOT_PASSWORD]:
    "We control your password, just follow all steps and everything will be good",
};
