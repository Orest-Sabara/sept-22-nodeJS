// import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { userRouter } from "./routers/user.router";
import { IError } from "./types/common.types";

// config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

// --- Error Handler ---
app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status;

  return res.status(status).json({
    message: err.message,
    status,
  });
});

app.get("/welcome", (req: Request, res: Response) => {
  res.send("WELCOME");
});

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL).then();
  console.log(`Server has started on PORT ${configs.PORT}`);
});
