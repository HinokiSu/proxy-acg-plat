import dayjs from 'dayjs'
import db from '../db'
import animeSql from '../db/sql/anime.sql'
import { TAnime, TUpdateAnimeDto } from '../interfaces/anime.types'
import {
  THandleResult,
  handleFailed,
  handleSuccess
} from '../utils/responseMsgHandler'

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
