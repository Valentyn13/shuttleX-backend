import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    password: string;
};

export type UserWithoutPassword = Omit<IUser, 'password'>;