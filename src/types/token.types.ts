import { IUser } from "./user.types";

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

// Pick бере з IUser поля "_id" та "name"  ....  зворотній Omit візьме всі поля з IUser крім "_id" та "name"
export type ITokenPayload = Pick<IUser, "_id" | "name">;

export type IActionTokenPayload = Pick<IUser, "_id">;
