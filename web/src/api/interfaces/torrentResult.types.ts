import { TTorrent } from '@interfaces/torrent.types'
import { TBaseResult } from './common.types'

export type TPaginTorrentResult = Omit<TBaseResult, 'data'> & {
  data: {
    total: number
    list: TTorrent[]
  }
}

export type TCountResult = Omit<TBaseResult, 'data'> & {
  data: {
    total: number
  }
}
