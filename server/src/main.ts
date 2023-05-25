import express from 'express'
import torrentRouter from './routes/torrent.route'
import cors from 'cors'
import getServerConfig from './get-config'

const bootstrap = async () => {
  const server = express()
  server.use(cors())
  const config = await getServerConfig()
  console.log(config)
  const port = config.Port

  server.use('/torrent', torrentRouter)
  server.listen(port, () => {
    console.log(`Listen: http://localhost:${port}`)
  })
}

try {
  bootstrap()
} catch (error) {
  console.log('Error: Main: ' + error)
}
