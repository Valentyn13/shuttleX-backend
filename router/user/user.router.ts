import { Router } from "express";
import { IUser } from "../../types/user.type";
import User from "../../models/user.model";

const userRouter: Router = Router()

userRouter.post('/register',async (req, res) => {
    const userData = req.body as IUser
    const newUser = await User.create(userData)
    res.status(200).json({
        id: newUser._id,
        name:newUser.name
    })
})

userRouter.post('/login',async (req, res) => {
    const {name, password} = req.body as IUser
    const user = await User.findOne({name})
    if(user) {
        const passwordValid = password === user.password
        if(passwordValid) {
            return res.status(200).json({
                id: user._id,
                name: user.name
            })
        }
        return res.status(400).json({error:'Invalid password'})
    }
    return res.status(400).json({error:'User with this name not found'})
})


export default userRouter;