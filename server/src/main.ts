import express from 'express'
import torrentRouter from './routes/torrent.route'
import cors from 'cors'
import getServerConfig from './get-config'
import animeRoute from './routes/anime.route'
import bodyParser from 'body-parser'
import userRouter from './routes/user.route'
const bootstrap = () => {
  const server = express()

  server.use(bodyParser.urlencoded({ extended: false }))
  server.use(bodyParser.json())
  server.use(cors())
  const config = getServerConfig()
  console.log(config)
  const port = config.Port

  server.use('/torrent', torrentRouter)
  server.use('/anime', animeRoute)
  server.use('/user', userRouter)
  server.listen(port, () => {
    console.log(`Listen: http://localhost:${port}`)
  })
}

try {
  bootstrap()
} catch (error) {
  console.log('Error: Main: ' + error)
}
