import { Types } from "mongoose";

import { Car } from "../models";
import { ICar } from "../types";

class CarRepository {
  public async getByUserAndCar(userId: string, carId: string): Promise<ICar> {
    // return Car.findById(carId).populate("user"); не завжди може спрацювати \\ шукає сar в якої є обєкт "user": {}
    const result = await Car.aggregate([
      {
        // - $match пошук по carId
        $match: {
          _id: carId,
          user: new Types.ObjectId(userId),
        },
      },
      {
        // - $lookup так як populate("user"); прикріплює користувача до нашого пошуку
        $lookup: {
          from: "users", //назва таблички в базі
          localField: "user", //Car.models -> user: {ref: User},
          foreignField: "_id", //посилаємся на _id в -> from: "users" ту що вказали
          as: "user", //як назвемо так і повернеться
        },
      },
      {
        $unwind: {
          path: "$user", //шлях через $ такий як вказали в -> $lookup: {as: "user"},
          // preserveNullAndEmptyArrays: true, //якщо поля б не існувало в табличці users то $unwind нічого не відобразив
        },
      },
    ]);
    return result[0];
  }
}

export const carRepository = new CarRepository();
