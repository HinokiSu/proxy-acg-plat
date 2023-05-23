import { defineStore } from 'pinia'
import { TTorrent } from '@interfaces/torrent.types'
import { fetchTorrentByPagin, fetchTorrentCount } from '@api/torrent.api'

type TState = {
  torrentList: Array<TTorrent>
  total: number
}

export const useTorrentStore = defineStore('TorrentStore', {
  state: (): TState => ({
    torrentList: [],
    total: 0
  }),
  getters: {},
  actions: {
    clearState() {
      this.torrentList = []
      this.total = 0
    },
    async getTorrentByPagin(curPage: number, pageSize: number) {
      const res = await fetchTorrentByPagin(curPage, pageSize)
      if (!res.status) {
        // TODO: Global show error msg
        return console.log('Msg: ' + res.msg)
      }
      this.total = res.data.total
      this.torrentList = this.torrentList.concat(res.data.list)
    },
    async getTorrentTotal() {
      const res = await fetchTorrentCount()
      if (!res.status) {
        console.log('Msg: ' + res.msg)
        return 0
      }
      return res.data.total
    }
  }
})
