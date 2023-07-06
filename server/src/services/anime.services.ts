import dayjs from 'dayjs'
import db from '../db'
import animeSql from '../db/sql/anime.sql'
import { TAnime, TUpdateAnimeDto } from '../interfaces/anime.types'
import {
  THandleResult,
  handleFailed,
  handleSuccess
} from '../utils/responseMsgHandler'
import getServerConfig from '../get-config'

/**
 *
 * @param startTime this quarter start time
 * @param pre previous start time(10day)
 * @param delay delay start time(30day)
 * @returns earliest and latest start time
 */
const calcAnimeQuarterStartTime = (startTime: string, pre = 10, delay = 30) => {
  const currentDate = dayjs(startTime)
  // sub the pre day
  const earliestStartTime = currentDate
    .subtract(pre, 'day')
    .format('YYYY/MM/DD')
  const latestStartTime = currentDate.add(30, 'day').format('YYYY/MM/DD')
  return {
    earliest: earliestStartTime,
    latest: latestStartTime
  }
}

export const getQuarter = (time: string) => {
  const quarterTime = calcAnimeQuarterStartTime(time)
  const total = db.get(animeSql.countSpecifyQuarter, [
    quarterTime.earliest,
    quarterTime.latest
  ])
  const res = db.query(animeSql.selectSpecifyQuarter, [
    quarterTime.earliest,
    quarterTime.latest
  ])
  return handleSuccess({
    msg: 'Get quarter success',
    data: {
      ...total,
      list: res
    }
  })
}

type TAnimeDetailResult = Omit<THandleResult, 'data'> & {
  data: {
    anime: TAnime
  }
}
export const findAnimeDetail = (id: string): TAnimeDetailResult => {
  const res = db.get(animeSql.selectById, [id])
  return handleSuccess({
    msg: 'Find anime detail by id success',
    data: {
      anime: res
    }
  })
}

/**
 * update full anime info
 * @param anime full anime info
 * @returns msg
 */
export const updateAnime = (anime: TUpdateAnimeDto) => {
  try {
    const res = db.run(animeSql.updateById, [
      anime.zh_name,
      anime.en_name,
      anime.img,
      anime.update_at,
      anime._id
    ])
    if (!res.changes)
      return handleFailed({
        msg: 'Update Anime detail failed'
      })
    return handleSuccess({
      msg: 'Update anime success'
    })
  } catch (error) {
    throw error
  }
}

type TMulterFile = Express.Multer.File & {
  remote?: string
}

/**
 *
 * @param file anime image file
 * @returns file type
 */
export const uploadHandle = (file: TMulterFile) => {
  const config = getServerConfig()
  const fullPath = config.ImgFilePathPrefix.concat(file.filename)
  // new remote attribute, full remote visit path
  file.remote = fullPath
  return file
}

/**
 * update anime image path
 * @param imgPath image remote path
 * @param id anime id
 * @returns msg
 */
export const updateAnimeImgPath = (imgPath: string, id: string) => {
  const res = db.run(animeSql.updateAnimeImg, [imgPath, id])
  if (!res.changes) {
    return handleFailed({
      msg: 'Update anime img path failed'
    })
  }
  return handleSuccess({
    msg: 'Update anime img path success'
  })
}

export const getAnimeByWeekDay = (week: number) => {
  const res = db.query(animeSql.selectSpecifyWeekDay, [week])
  return handleSuccess({
    msg: `Get anime info by week`,
    data: {
      list: res
    }
  })
}
