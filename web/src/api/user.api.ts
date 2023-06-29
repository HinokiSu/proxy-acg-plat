import { apiURLHandler } from '@utils/apiURLHandler'
import { TLoginResult } from './interfaces/userResult.types'
import ApiClient from '@utils/axios'
import { TBaseResult } from './interfaces/common.types'

const apiBasePath = '/user'
export const postLogin = (
  email: string,
  password: string
): Promise<
  Omit<TBaseResult, 'data'> & {
    data: TLoginResult
  }
> =>
  ApiClient.post(apiURLHandler(apiBasePath, `/login`), {
    email,
    password
  })
