import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";

interface IPaginationResponse<T> {
  page: number;
  perPage: number;
  itemsCount: number;
  itemsFound: number;
  data: T[];
}

export interface IQuery {
  page: string;
  limit: string;
  sortedBy: string;
  [key: string]: string;
}

class UserService {
  public async getAll(): Promise<IUser[]> {
    try {
      return User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getWithPagination(
    query: IQuery
  ): Promise<IPaginationResponse<IUser>> {
    try {
      // // --- statics ---
      // const data = await User.findByName("Orest");
      // console.log(data); //знаходить користувача і всі його дані. findByName так як find(name: "Orest") тільки свій метод

      // // --- methods ---
      // const user = await User.findById("641063191850e0d4a15a27e7");
      // console.log(user.nameWithAge()); //Bender is 55 years old.

      // // --- virtual ---
      // const user = await User.findById("641063191850e0d4a15a27e7");
      // console.log(user.nameWithSurname); //Bender Piatov

      const queryStr = JSON.stringify(query);
      // queryStr = {"age":{"gte":"22"}}
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
      );
      // queryObj = {age:{'$gte':'22'}}

      const {
        page = 1,
        limit = 3,
        sortedBy = "createdAt",
        ...searchObject
      } = queryObj;
      const skip = limit * (page - 1);

      const users = await User.find(searchObject)
        .limit(limit)
        .skip(skip)
        .sort(sortedBy)
        .lean(); //обрізає не потрібну метадату яка приходить з Mongo

      const usersTotalCount = await User.count();

      return {
        page: +page,
        itemsCount: usersTotalCount,
        perPage: +limit,
        itemsFound: users.length,
        data: users,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(id: string): Promise<IUser> {
    try {
      return User.findById(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
