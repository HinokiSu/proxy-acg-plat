import { TAnime } from '@interfaces/anime.types'
import { TBaseResult } from './common.types'

export type TPaginQuarterAnime = Omit<TBaseResult, 'data'> & {
  data: {
    total: number
    list: TAnime[]
  }
}

export type TResultAnimeDetail = Omit<TBaseResult, 'data'> & {
  data: {
    anime: TAnime
  }
}

export type TResultWeekAnime = Omit<TBaseResult, 'data'> & {
  data: {
    list: TAnime[]
  }
}
