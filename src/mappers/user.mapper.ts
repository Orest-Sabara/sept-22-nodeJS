import { configs } from "../configs";
import { IUser } from "../types";

export class UserMapper {
  public toResponse(user: IUser) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      age: user.age || null,
      avatar: user.avatar
        ? `${configs.AWS_S3_BUCKET_URL}/${user.avatar}`
        : null,
      phone: user.phone,
    };
  }

  public toManyResponse(users: IUser[]) {
    return users.map(this.toResponse);
    // return users.map((item) => this.toResponse(item));
  }
}

export const userMapper = new UserMapper();
