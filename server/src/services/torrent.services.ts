import { handleFailed, handleSuccess } from '../utils/responseMsgHandler'
import db from '../db'
import { calcOffset } from '../utils/calcOffset'
import TorrentSql from '../db/sql/torrent.sql'
import { findAnimeDetail } from './anime.services'

/**
 * Get torrent by pagination
 * @param curPage number
 * @param pageSize number
 * @returns Promise<array>
 */
export const getTorrentPagination = (curPage: number, pageSize: number) => {
  const total = db.get(TorrentSql.calcTotal)
  const offset = calcOffset(curPage, pageSize)
  const res = db.query(TorrentSql.paginSelect, [pageSize, offset])
  return handleSuccess({
    msg: `Get Torrent by pagination success`,
    data: {
      ...total,
      list: res
    }
  })
}

/**
 * get torrent total
 * @returns number
 */
export const getTorrentTotal = () => {
  const total = db.get(TorrentSql.calcTotal)
  return handleSuccess({
    msg: 'Get torrent total success',
    data: {
      ...total
    }
  })
}

const createLikeList = (title: string, arr: Array<string>) => {
  if (title.trim() !== '') {
    arr.push('%' + title + '%')
  }
  return arr
}
export const getFuzzySearchTitle = (
  curPage: number,
  pageSize: number,
  keyword?: string,
  anime?: string
) => {
  keyword = keyword?.trim()
  if (!keyword && !anime) {
    return handleFailed({
      msg: `Error: keyword is empty! Please reInput`,
      data: {
        total: 0,
        list: []
      }
    })
  }
  const offset = calcOffset(curPage, pageSize)

  if (anime) {
    // Only anime list
    const animeDetail = findAnimeDetail(anime)
    const keywordsList: string[] = []
    createLikeList(animeDetail.data.anime.ja_name, keywordsList)
    createLikeList(animeDetail.data.anime.zh_name, keywordsList)
    createLikeList(animeDetail.data.anime.en_name, keywordsList)
    const total = db.get(TorrentSql.fuzzySelectMultiTitleTotal(keywordsList), [
      ...keywordsList
    ])

    const res = db.query(TorrentSql.fuzzySelectMultiTitle(keywordsList), [
      ...keywordsList,
      pageSize,
      offset
    ])

    return handleSuccess({
      msg: 'Fuzzy search torrent title success',
      data: {
        ...total,
        list: res
      }
    })
  }
  // use keywords fuzzy search

  const keywordParam = '%' + keyword + '%'
  const total = db.get(TorrentSql.fuzzySelectTitleTotal, [keywordParam])
  const res = db.query(TorrentSql.fuzzySelectTitle, [
    keywordParam,
    pageSize,
    offset
  ])
  return handleSuccess({
    msg: 'Fuzzy search torrent title success',
    data: {
      ...total,
      list: res
    }
  })
}
