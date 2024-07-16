import { UserWithoutPassword } from "./user.type";

export type IMessage = {
    id: number;
    user: UserWithoutPassword
    message: string;
};
