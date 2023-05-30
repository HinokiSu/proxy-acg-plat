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
  keyword: string
}

torrentRouter.get('/search', (req: any, res) => {
  try {
    const pagin: TSearchPagin = req.query
    res.json(getFuzzySearchTitle(pagin.keyword, pagin.curpage, pagin.pagesize))
  } catch (err) {
    console.log(err)
  }
})

export default torrentRouter
