import express from 'express'
import {
  deleteAnime,
  findAnimeDetail,
  getAnimeByWeekDay,
  getQuarter,
  insertNewAnime,
  updateAnime,
  updateAnimeImgPath,
  uploadHandle
} from '../services/anime.services'
import { TAnime, TUpdateAnimeDto } from '../interfaces/anime.types'
import { getErrorMessage } from '../utils/responseMsgHandler'
import { verifyToken } from '../services/auth'
import upload from '../utils/multer'

const animeRoute = express.Router()

type TQuery = { id: string }
animeRoute.get('/id', (req, res, next) => {
  const query = req.query as TQuery
  res.json(findAnimeDetail(query.id))
})

animeRoute.post('/add', verifyToken, (req, res) => {
  try {
    const body = req.body as TAnime
    res.json(insertNewAnime(body))
  } catch (error) {
    return res.status(500).send(getErrorMessage(error))
  }
})

animeRoute.post('/update', verifyToken, (req, res) => {
  try {
    const body = req.body as TUpdateAnimeDto
    res.json(updateAnime(body))
  } catch (error) {
    return res.status(500).send(getErrorMessage(error))
  }
})

animeRoute.post(
  '/upload',
  verifyToken,
  upload.single('file'),
  (req, res, next) => {
    if (!req.file) {
      return res.json({
        msg: `Error: File upload file received failed`,
        status: 0,
        file: {}
      })
    }

    res.json({
      msg: `Info: File upload received success`,
      status: 200,
      file: uploadHandle(req.file)
    })
  }
)

type TQuarterQuery = {
  time: string
}

animeRoute.get('/all', (req, res) => {
  const query = req.query as TQuarterQuery
  res.json(getQuarter(query.time))
})

type TWeekQuery = { week: number }

animeRoute.get('/week', (req: any, res) => {
  const query = req.query as TWeekQuery
  res.json(getAnimeByWeekDay(query.week))
})

animeRoute.post('/update/img', verifyToken, (req, res) => {
  const query = req.body as {
    img: string
    id: string
  }
  res.json(updateAnimeImgPath(query.img, query.id))
})

animeRoute.post('/delete/id', verifyToken, (req, res) => {
  const body = req.body as {
    id: string
  }
  res.json(deleteAnime(body.id))
})

export default animeRoute
