import { dbConnect } from '../../db'
import { getTorrentTotal } from '../torrent.services'

describe('Torrent Service Test', () => {
  it('get count', async () => {
    await dbConnect()
    const res = await getTorrentTotal()
    console.log(res)
  })
})
