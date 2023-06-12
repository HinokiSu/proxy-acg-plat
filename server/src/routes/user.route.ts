import express from 'express'
import { TRegisterDto, TUserDto } from '../interfaces/user.type'
import { loginUser, registerUser } from '../services/user.services'
import { getErrorMessage } from '../utils/responseMsgHandler'

const userRouter = express.Router()

userRouter.post('/login', (req, res, next) => {
  try {
    const user = req.body as TUserDto
    res.json(loginUser(user))
  } catch (error) {
    return res.status(500).send(getErrorMessage(error))
  }
})

userRouter.post('/register', (req, res, next) => {
  try {
    const user = req.body as TRegisterDto
    console.log(req.body)
    registerUser(user)
    res.status(200).send('Register successfully')
  } catch (error) {
    return res.status(500).send(getErrorMessage(error))
  }
})

export default userRouter
