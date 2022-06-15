import { Schema, model } from "mongoose";

export interface ITokens {
  access: string;
  refresh: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  tokens: ITokens;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },

  tokens: {
    access: { type: String, required: true },
    refresh: { type: String, required: true },
  },
});

export const User = model<IUser>("User", UserSchema);
