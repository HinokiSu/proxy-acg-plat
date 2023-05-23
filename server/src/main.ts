import express from 'express'
import torrentRouter from './routes/torrent.route'
import { dbConnect, dbDisconnect } from './db'
import cors from 'cors'
import getServerConfig from './get-config'
try {
  dbConnect().then(async () => {
    const server = express()
    server.use(cors())
    const config = await getServerConfig()
    console.log(config)
    const port = config.Port

    server.use('/torrent', torrentRouter)
    server.listen(port, () => {
      console.log(`Listen: http://localhost:${port}`)
    })
    await dbDisconnect()
  })
} catch (error) {
  dbDisconnect()
  console.log('Error: Main: ' + error)
}
