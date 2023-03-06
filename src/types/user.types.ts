export enum EGenders {
  male = "male",
  famele = "famele",
  mixed = "mixed",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  gender: string;
}
