import { defineStore } from 'pinia'
import { TTorrent } from '@interfaces/torrent.types'
import {
  fetchFuzzySearchTitle,
  fetchTorrentByPagin,
  fetchTorrentCount
} from '@api/torrent.api'
import { handleError } from './common/handle-error'
type TState = {
  torrentList: Array<TTorrent>
  total: number
  isCompleted: boolean
}

export const useTorrentStore = defineStore('TorrentStore', {
  state: (): TState => ({
    torrentList: [],
    total: 0,
    isCompleted: true
  }),
  getters: {},
  actions: {
    clearState() {
      this.torrentList = []
      this.total = 0
      this.isCompleted = true
    },

    async getTorrentByPagin(curPage: number, pageSize: number) {
      const res = await fetchTorrentByPagin(curPage, pageSize)
      handleError(res)
      if (res.data.list.length) {
        this.isCompleted = false
      } else {
        this.isCompleted = true
      }
      this.total = res.data.total
      this.torrentList = this.torrentList.concat(res.data.list)
    },
    async getTorrentTotal() {
      const res = await fetchTorrentCount()
      handleError(res)
      return res.data.total
    },
    async searchFuzzyTitle(keyword: string, curPage: number, pageSize: number) {
      const res = await fetchFuzzySearchTitle(keyword, curPage, pageSize)
      handleError(res)
      if (res.data.list.length) {
        this.isCompleted = false
      } else {
        this.isCompleted = true
      }
      this.total = res.data.total
      this.torrentList = this.torrentList.concat(res.data.list)
    }
  }
})
