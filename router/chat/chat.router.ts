import { Router } from "express";
import { IChat } from "../../types/chat.type";
import Chat from "../../models/chat.model";
import { IMessage } from "../../types/message.type";

const chatRouter: Router = Router()

chatRouter.get('/:id', async (req, res) => {
    const id = req.params.id as string
    const chat = await Chat.findById(id)
    res.status(200).json(chat)
})

chatRouter.get('/',async(req, res) => {
    const chats = await Chat.find()
    res.status(200).json(chats)
})

chatRouter.post('/', async (req, res) => {
    const chatData = req.body as IChat
    const newChat = await Chat.create(chatData)
    res.status(200).json(newChat)
})

chatRouter.delete('/:id',async(req,res) => {
    const chatId = req.params.id
    const {userId} = req.body as {userId: string}
    const chat = await Chat.findById(chatId)

    if (!chat) {
        return res.status(400).json({error:'Chat with this id din not exist'})
    }

    const isOwner = chat.ownerId === userId

    if (!isOwner) {
        return res.status(400).json({error: 'You have to be an owner to delete this chat'})
    }

    await Chat.findByIdAndDelete(chat._id)

    res.status(200).json({message: 'Chat deleted!'})
})

chatRouter.patch('/:id', async (req, res) => {
    const message = req.body as IMessage
    const chatId = req.params.id

    const updatedChat = await Chat.findByIdAndUpdate(chatId, {
        $push: {messages:message}},
        { new: true})

        if(updatedChat) {
            return res.status(200).json(updatedChat.messages)
        }
        res.status(400).json({error: 'Chat with this id did not exist'})
    
})

export default chatRouter;