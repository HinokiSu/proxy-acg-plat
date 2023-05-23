import express from 'express'
import { TPaginQuery } from '../interfaces/request.types'
import { getTorrentPagination, getTorrentTotal } from '../services/torrent.services'

const torrentRouter = express.Router()
/* route child root: torrent */
torrentRouter.get('/latest', (req, res) => {})

torrentRouter.get('/pagin', async (req: any, res) => {
  try {
    const pagin: TPaginQuery = req.query
    if (!pagin.curpage) {
      res.json({
        msg: 'Pagination query parameter cannot be empty',
        status: 0
      })
    }
    res.json(await getTorrentPagination(pagin.curpage, pagin.pagesize))
  } catch (error) {
    console.log(error)
  }
})

torrentRouter.get('/count', async (req, res) => {
  try {
    res.json(await getTorrentTotal())
  } catch (err) {
    console.log(err)
  }
})

export default torrentRouter
