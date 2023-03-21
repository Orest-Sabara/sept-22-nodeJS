import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Token } from "../models";

dayjs.extend(utc);

const tokensRemover = async (): Promise<void> => {
  // const previousMonth = dayjs().utc().subtract(1,"month"); //минулий місяць
  // const previousMonth = dayjs().utc().startOf(1,"day"); //початок минулого дня
  // const previousMonth = dayjs().utc().endOf(1,"day"); //кінець дня
  // const previousMonth = dayjs().utc().format("DD/MM/YYYY"); //20/03/2023

  const previousMonth = dayjs().utc().subtract(1, "month");

  await Token.deleteMany({ createdAt: { $lte: previousMonth } }); //забираємо токени які були створені минулого місяця
};

export const removeOldTokens = new CronJob("0 0 * * *", tokensRemover);
