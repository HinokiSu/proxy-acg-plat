import { TMenuItem } from '@interfaces/menu.types'
import { defineStore } from 'pinia'

type TState = {
  menuList: TMenuItem[]
}
export const useMenuStore = defineStore('MenuStore', {
  state: (): TState => ({
    menuList: []
  }),
  getters: {},
  actions: {
    clearState() {
      // only level 1
      this.menuList = []
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
    changeMenuItemStatus(key: number) {
      const isActive = this.menuList[key].status
      if (isActive) return isActive
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
