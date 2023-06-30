import express from 'express'
import { TPaginQuery } from '../interfaces/request.types'
import {
  getFuzzySearchTitle,
  getTorrentPagination,
  getTorrentTotal
} from '../services/torrent.services'

const torrentRouter = express.Router()
/* route child root: torrent */

torrentRouter.get('/pagin', (req: any, res) => {
  try {
    const pagin: TPaginQuery = req.query
    if (!pagin.curpage) {
      res.json({
        msg: 'Pagination query parameter cannot be empty',
        status: 0
      })
    }
    res.json(getTorrentPagination(pagin.curpage, pagin.pagesize))
  } catch (error) {
    console.log(error)
  }
})

torrentRouter.get('/count', (req, res) => {
  try {
    res.json(getTorrentTotal())
  } catch (err) {
    console.log(err)
  }
})

interface TSearchPagin extends TPaginQuery {
  keyword?: string
  anime?: string
}

torrentRouter.get('/search', (req: any, res) => {
  try {
    const pagin: TSearchPagin = req.query
    console.log(pagin)
    res.json(
      getFuzzySearchTitle(
        pagin.curpage,
        pagin.pagesize,
        pagin.keyword,
        pagin.anime
      )
    )
  } catch (err) {
    console.log(err)
  }
})

export default torrentRouter
