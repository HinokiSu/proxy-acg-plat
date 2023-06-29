import { TMenuItem } from '@interfaces/menu.types'
import { defineStore } from 'pinia'

type TState = {
  menuList: TMenuItem[]
  activeKey: number
}
export const useMenuStore = defineStore('MenuStore', {
  state: (): TState => ({
    menuList: [],
    activeKey: 0
  }),
  getters: {
    getMenuKey: (state) => {
      const key = Number.parseInt(sessionStorage.getItem('menu_key') || '0')
      state.activeKey = key
      return key
    }
  },
  actions: {
    clearState() {
      // only level 1
      this.menuList = []
      this.activeKey = 0
    },
    getMenuList() {
      const menus = [
        {
          key: 0,
          title: 'Torrent',
          routeName: 'torrents',
          icon: 'forever-ring-icon',
          status: true
        },
        {
          key: 1,
          title: 'Anime',
          routeName: 'quarter',
          icon: 'movie-icon',
          status: false
        }
      ]

      this.menuList = menus
    },
    setAdminMenu() {
      const adminMenu = [
        {
          key: 2,
          title: 'Admin',
          routeName: 'update-anime',
          icon: 'admin-icon',
          status: false
        }
      ]
      this.menuList = this.menuList.concat(...adminMenu)
      this.menuList.sort((a, b) => {
        return a.key - b.key
      })
    },
    changeMenuItemStatus(key: number) {
      if (!this.menuList[key]) {
        key = 0
      } else {
        const isActive = this.menuList[key].status
        if (isActive) return isActive
      }
      this.menuList.forEach((_it) => {
        if (_it.key === key) {
          _it.status = true
        } else {
          _it.status = false
        }
      })
      return false
    }
  }
})
