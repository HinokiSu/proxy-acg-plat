import { apiURLHandler } from '@utils/apiURLHandler'
import ApiClient from '@utils/axios'
import {
  TCountResult,
  TPaginTorrentResult
} from './interfaces/torrentResult.types'
const apiBasePath = '/torrent'
export const fetchTorrentByPagin = (
  curPage: number,
  pageSize: number
): Promise<TPaginTorrentResult> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/pagin`), {
    curpage: curPage,
    pagesize: pageSize
  })

export const fetchTorrentCount = (): Promise<TCountResult> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/total`))

export const fetchFuzzySearchTitle = (
  curPage: number,
  pageSize: number,
  keyword?: string,
  anime?: string
): Promise<TPaginTorrentResult> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/search`), {
    curpage: curPage,
    pagesize: pageSize,
    keyword,
    anime
  })
