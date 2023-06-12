import express from 'express'
import {
  findAnimeDetail,
  getQuarter,
  updateAnime
} from '../services/anime.services'
import { TUpdateAnimeDto } from '../interfaces/anime.types'
import { getErrorMessage } from '../utils/responseMsgHandler'
import { verifyToken } from '../services/auth'
import upload from '../utils/multer'

const animeRoute = express.Router()

type TQuery = { id: string }
animeRoute.get('/id', (req, res, next) => {
  const query = req.query as TQuery
  res.json(findAnimeDetail(query.id))
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
      file: req.file
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

export default animeRoute
