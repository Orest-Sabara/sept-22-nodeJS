import { removeOldPasswords } from "./remove.old.password.cron";
import { removeOldTokens } from "./remove.old.token.cron";

export const cronRunner = () => {
  removeOldTokens.start();
  removeOldPasswords.start();
};
