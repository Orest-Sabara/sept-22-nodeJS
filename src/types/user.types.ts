import { Model } from "mongoose";

export enum EGenders {
  male = "male",
  famele = "famele",
  mixed = "mixed",
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  age: number;
  avatar?: string;
  phone?: string;
}

export interface IUserMethods {
  nameWithAge(): void;
}

export interface IUserVirtuals {
  nameWithSurname: string;
}

export interface IUserModel
  extends Model<IUser, object, IUserMethods, IUserVirtuals> {
  findByName(name: string): Promise<IUser[]>;
}
