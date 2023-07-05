import fs from 'fs'
import path from 'path'

type TConfig = {
  DataBasePath: string
  Port: number
  SecretKey: string
  UploadPath: string
  ImgFilePathPrefix: string
}
const getServerConfig = () => {
  const isDev = process.env.NODE_ENV === 'development'
  let configPath = ''

  if (isDev) {
    configPath = path.join(process.cwd(), path.sep, 'server.config.dev.json')
  } else {
    configPath = path.join(process.cwd(), path.sep, 'server.config.json')
  }
  console.log(configPath)
  const config = fs.readFileSync(configPath, 'utf-8')
  if (!config) {
    console.log(`Error: Config is empty!!, config path: ${configPath}`)
    return {
      DataBasePath: '',
      Port: 5100,
      SecretKey: '',
      UploadPath: '',
      ImgFilePathPrefix: ''
    }
  }
  const configJson: TConfig = JSON.parse(config)

  return configJson
}

export default getServerConfig
