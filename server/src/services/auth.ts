import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { getSecretKey } from '../utils/getSecretKey'

let SECRET_KEY: string
SECRET_KEY = getSecretKey()

export const verifyToken = (req: any, res: any, next: NextFunction) => {
  try {
    const token = req.headers.authorization.replace('jwt ', '')
    if (!token) throw new Error()

    const decoded = jwt.verify(token, SECRET_KEY)
    req.token = decoded
    next()
  } catch (error) {
    res.status(401).send('Please authenticate')
  }
}
