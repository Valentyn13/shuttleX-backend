import { model, Model, Schema } from "mongoose";

import { IMessage } from "../types/message.type";

const MessageShema = new Schema<IMessage> ({
    userName: {type: String, required: true},
    message: {type: String, required: true}
})

const Message: Model<IMessage> = model('Message', MessageShema)

export default Message;