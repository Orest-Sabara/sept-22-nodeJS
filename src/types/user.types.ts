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
}
