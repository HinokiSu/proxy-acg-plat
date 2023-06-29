import { TUser } from '@interfaces/user.types'

export type TLoginResult = {
  user: TUser
  token: string
}
