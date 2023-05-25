import { handleSuccess } from '../utils/responseMsgHandler'
import db from '../db'
import { calcOffset } from '../utils/calcOffset'
import TorrentSql from '../db/sql/torrent.sql'

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
      list: res,
      ...total
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
