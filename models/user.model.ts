import { Model, model, Schema } from "mongoose";

import { IUser } from "../types/user.type";

const UserShema = new Schema<IUser>({
    name: {type: String, required: true, unique: true,},
    password: {type: String, required: true},
})


const User: Model<IUser> = model('User', UserShema)

export default User;