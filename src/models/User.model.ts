import { model, Schema } from "mongoose";

import { EGenders, EUserStatus } from "../enums";
import { IUser, IUserModel } from "../types";

const userSchema = new Schema(
  {
    name: {
      type: String,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    age: {
      type: Number,
      required: false,
    },
    gender: {
      type: String,
      enum: EGenders,
    },
    avatar: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: EUserStatus,
      default: EUserStatus.inactive,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.virtual("nameWithSurname").get(function () {
  return `${this.name} Piatov`;
});
// userSchema.virtual("fullName").get(function () {
//   return `${this.name} ${this.surname}`;
// });

userSchema.methods = {
  // --- method - for user ---
  //const user = new User();   створюємо від моделі
  // user.nameWithAge();       і вже в user є methods та virtual
  // console.log(user.nameWithSurname);
  nameWithAge() {
    return `${this.name} is ${this.age} years old.`;
  },
};

userSchema.statics = {
  // --- static - for User ---
  // до нашої моделі використовуємо statics User.findByName
  async findByName(name: string): Promise<IUser[]> {
    return this.find({ name });
  },
};

export const User = model<IUser, IUserModel>("user", userSchema);
