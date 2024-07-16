import { UserWithoutPassword } from './types/user.type';
import express from 'express'
import { createServer } from 'http'
import {Server} from 'socket.io'
import cors from 'cors'
import bodyParser from 'body-parser'

import connectDb from './config/db.confing'
import AppRouter from './router/router'
import { AddMessageRequestDto } from './types/add-message-request.dto';
import Chat from './models/chat.model';
import { IChat } from './types/chat.type';

const app = express()

const router = new AppRouter(app)

const server = createServer(app)

const io = new Server({
    cors:{
        origin:"*"
    }
})

connectDb()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.init()

const httpPort = 8002;
const websocketPort = 8001

io.on('connection', (socket) => {
    socket.on('CHAT_OPEN', async({chatID, userID}:{chatID: string, userID:string}) =>{
      const chat = await Chat.findById(chatID)
      const userInChat = chat?.members.find((user) =>user.id === userID)
      if(userInChat){
        socket.join(chatID)
      }
    })

    socket.on('MANUAL_JOIN',async ({chatID,member}:{chatID:string; member:{id: string, name: string}}) => {
       await Chat.findByIdAndUpdate(chatID, {
        $push: {members:member}},
        { new: true})

        socket.join(chatID)
    })

    socket.on('ADD_MESSAGE', async ({message, user, chatID}: AddMessageRequestDto) =>{
      const updatedChat = await Chat.findByIdAndUpdate(chatID, {
        $push: {messages:{user, message}}},
        { new: true})

      const lastMessage = updatedChat?.messages[updatedChat.messages.length -1]
        io.emit('UPDATE_CHAT',lastMessage)
    })

    socket.on('CREATE_CHAT', async (chat: IChat) => {
      const {_id, name, ownerId, ownerName, members} = await Chat.create(chat)
      const data = {
        _id,
        name,
        ownerId,
        ownerName,
        members
      }

      io.emit('GET_NEW_CHAT', data)
    }) 

    socket.on('DELETE_CHAT', async (chatId) => {
      await Chat.findByIdAndDelete(chatId)
      io.emit('UPDATE_CHAT_AFTER_DELETION',chatId)
    })

    socket.on('LEFT_CHAT',async (data:{chatId:string, userId: string}) => {
      const chat = await Chat.findById(data.chatId)
      const members = chat?.members.filter((member) => member.id != data.userId)
      console.log(members)
      await Chat.updateOne({_id: data.chatId}, {members})
      io.emit('DECREASE_MEMBER', {chatId: data.chatId, userId: data.userId})
});
})
io.listen(websocketPort)

app.listen(httpPort, () => console.log(`Server started on port ${httpPort}`));
process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});