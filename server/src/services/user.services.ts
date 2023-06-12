import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { TRegisterDto, TUserDto } from '../interfaces/user.type'
import db from '../db'
import userSql from '../db/sql/user.sql'
import { v4 as uuidV4 } from 'uuid'
import dayjs from 'dayjs'
import { getSecretKey } from '../utils/getSecretKey'
import { handleFailed, handleSuccess } from '../utils/responseMsgHandler'

const saltRounds = 8
export const registerUser = (user: TRegisterDto) => {
  try {
    const _id = uuidV4()
    const saltPwd = bcrypt.hashSync(user.password, saltRounds)
    db.run(userSql.insert, [
      _id,
      user.name,
      user.email,
      saltPwd,
      user.role,
      dayjs().toISOString()
    ])
  } catch (error) {
    throw error
  }
}

let SECRET_KEY: string
SECRET_KEY = getSecretKey()

export const loginUser = (user: TUserDto) => {
  const foundUser = db.get(userSql.findOne, [user.email])
  if (!foundUser) throw new Error('User cannot found')
  const isMatch = bcrypt.compareSync(user.password, foundUser.password)
  if (isMatch) {
    const token = jwt.sign(
      {
        _id: foundUser._id,
        email: foundUser.email
      },
      SECRET_KEY,
      {
        expiresIn: '2 days'
      }
    )
    delete foundUser.password
    return handleSuccess({
      msg: `user login success`,
      data: {
        user: {
          _id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role
        },
        token: token
      }
    })
  } else {
    return handleFailed({
      msg: `Password is not correct`
    })
  }
}
