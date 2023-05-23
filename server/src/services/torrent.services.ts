import { handleSuccess } from '../utils/responseMsgHandler'
import { TorrentModel } from '../model/torrent.model'

/**
 * Get torrent by pagination
 * @param curPage number
 * @param pageSize number
 * @returns Promise<array>
 */
export const getTorrentPagination = async (
  curPage: number,
  pageSize: number
) => {
  const total = await TorrentModel.count({})
  const res = await TorrentModel.find({})
    .skip((curPage - 1) * pageSize)
    .limit(pageSize)
    .sort({ publish_time: -1, _id: -1 })
    .exec()
  return handleSuccess({
    msg: `Get Torrent by pagination success`,
    data: {
      list: res,
      total
    }
  })
}

/**
 * get torrent total
 * @returns number
 */
export const getTorrentTotal = async () => {
  const total = await TorrentModel.count({})
  return handleSuccess({
    msg: 'Get torrent total success',
    data: {
      total: total
    }
  })
}
