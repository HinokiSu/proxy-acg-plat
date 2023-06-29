import { postLogin } from '@api/user.api'
import { TUser } from '@interfaces/user.types'
import { defineStore } from 'pinia'

type TState = {
  isLogin: boolean
  user: TUser
  token: string
}

export const useUserStore = defineStore('UserStore', {
  state: (): TState => ({
    isLogin: false,
    user: {
      _id: '',
      name: '',
      email: '',
      role: ''
    },
    token: ''
  }),
  getters: {},
  actions: {
    logout() {
      this.isLogin = false
      ;(this.user = {
        _id: '',
        name: '',
        email: '',
        role: ''
      }),
        (this.token = '')
    },
    async login(email: string, pwd: string) {
      const res = await postLogin(email, pwd)
      if (res.status !== 200) {
        this.isLogin = false
        return res.msg
      }
      this.user = res.data.user
      this.token = 'jwt ' + res.data.token
      this.isLogin = true
      sessionStorage.setItem('token_key', this.token)
    }
  }
})
