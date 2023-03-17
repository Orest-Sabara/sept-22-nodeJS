import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs";
import { ApiError } from "./errors";
import { authRouter, userRouter } from "./routers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);

// --- Error Handler ---
<<<<<<<<< Temporary merge branch 1
app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
=========
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
>>>>>>>>> Temporary merge branch 2
  const status = err.status || 500;

  return res.status(status).json({
    message: err.message,
    status,
  });
});

app.get("/welcome", (req: Request, res: Response) => {
  res.send("WELCOME");
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  // eslint-disable-next-line no-console
  console.log(`Server has started on PORT ${configs.PORT}`);
});
