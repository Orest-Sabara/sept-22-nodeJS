import * as Joi from "joi";

import { regexConstants } from "../constants";
<<<<<<<<< Temporary merge branch 1
import { EGenders } from "../types/user.types";
=========
import { EGenders } from "../enums";
>>>>>>>>> Temporary merge branch 2

export class UserValidator {
  private static firstName = Joi.string().min(2).max(35).trim();
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .max(35)
    .trim();
  private static password = Joi.string().regex(regexConstants.PASSWORD);
  private static gender = Joi.valid(...Object.values(EGenders));

  static createUser = Joi.object({
    name: this.firstName.required(),
    email: this.email.required(),
    password: this.password.required(),
    gender: this.gender.required(),
  });
  static updateUser = Joi.object({
    name: this.firstName,
    gender: this.gender,
  });
<<<<<<<<< Temporary merge branch 1
=========

  static loginUser = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
>>>>>>>>> Temporary merge branch 2
}
