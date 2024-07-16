import { model, Model, Schema } from "mongoose";
import { IChat } from "../types/chat.type";


const ChatShema = new Schema<IChat>({
    ownerId: {type: String, required: true},
    ownerName: {type:String, required: true},
    name: {type: String, required: true},
    members:{
        type:[{
            id: Schema.ObjectId,
            name: {type: String, required: true}
        }],
        required: true
    },
    messages:{
        type: [
            {
                id: {type: String, required: true},
                user:{type: {
                    id: {type: String, required: true},
                    name: {type: String, required: true}
                }, required:true},
                message: {type :String, required: true}
            }
        ],
        required: true
    }
})

const Chat: Model<IChat> = model('Chat', ChatShema)

export default Chat;