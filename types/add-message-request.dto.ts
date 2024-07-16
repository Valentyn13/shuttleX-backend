import { UserWithoutPassword } from "./user.type";

export type AddMessageRequestDto = {chatID:string,message: string; user: UserWithoutPassword}