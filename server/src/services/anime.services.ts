import db from '../db'
import animeSql from '../db/sql/anime.sql'
import { TUpdateAnimeDto } from '../interfaces/anime.types'
import { handleFailed, handleSuccess } from '../utils/responseMsgHandler'
export const getQuarter = (time: string) => {
  const total = db.get(animeSql.countByQuarter, [time])
  const res = db.query(animeSql.selectByQuarter, [time])
  return handleSuccess({
    msg: 'Get quarter success',
    data: {
      ...total,
      list: res
    }
  })
}

export const findAnimeDetail = (id: string) => {
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
    if(!res.changes) return handleFailed({
      msg: 'Update Anime detail failed'
    })
    return handleSuccess({
      msg: 'Update anime success'
    })
  } catch (error) {
    throw error
  }
}
