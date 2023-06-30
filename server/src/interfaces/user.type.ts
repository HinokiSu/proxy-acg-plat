export interface IUser {
  _id: string
  name: string
  email: string
  password: string
  role: string
  create_at: string
}

export type TUserDto = {
  email: string
  password: string
}


export type TRegisterDto = {
  name: string
  email: string
  password: string
  role: string
}
