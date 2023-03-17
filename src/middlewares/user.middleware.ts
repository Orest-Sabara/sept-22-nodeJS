import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

<<<<<<<<< Temporary merge branch 1
import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
=========
import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";
>>>>>>>>> Temporary merge branch 2
import { UserValidator } from "../validators";

class UserMiddleware {
  public async getByIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        throw new ApiError("User not found", 422);
<<<<<<<<< Temporary merge branch 1
=========
      }

      res.locals.user = { user };
      next();
    } catch (e) {
      next(e);
    }
  }

  public getDynamicallyAndThrow(
    fieldName: string,
    from: "body" | "query" | "params" = "body",
    dBField: keyof IUser = "email"
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        // const fieldValue = req.body.email
        const fieldValue = req[from][fieldName];

        // --------- await User.findOne({ email: req.body,email });
        const user = await User.findOne({ [dBField]: fieldValue });

        if (user) {
          throw new ApiError(
            `User with ${fieldName}, ${fieldValue} already exist`,
            409
          );
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public getDynamicallyOrThrow(
    fieldName: string,
    from: "body" | "query" | "params" = "body",
    dBField: keyof IUser = "email"
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        // const fieldValue = req.body.email
        const fieldValue = req[from][fieldName];

        // --------- await User.findOne({ email: req.body,email });
        const user = await User.findOne({ [dBField]: fieldValue });

        if (!user) {
          throw new ApiError("User not found", 422);
        }

        req.res.locals = { user };

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  //Validators
  public async isIdValid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!isObjectIdOrHexString(req.params.userId)) {
        throw new ApiError("ID not valid", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.createUser.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.updateUser.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error } = UserValidator.loginUser.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
>>>>>>>>> Temporary merge branch 2
      }

      res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserIdValid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!isObjectIdOrHexString(req.params.userId)) {
        throw new ApiError("ID not valid", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserValidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.createUser.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserValidUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.updateUser.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
