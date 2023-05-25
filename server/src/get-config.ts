import fs from 'fs'
import path from 'path'

type TConfig = {
  DataBasePath: string
  Port: number
}
const getServerConfig =  () => {
  const configPath = path.join(process.cwd(), path.sep, 'server.config.json')
  const config =  fs.readFileSync(configPath, 'utf-8')
  if (!config) {
    console.log(`Error: Config is empty!!, config path: ${configPath}`)
    return {
      DataBasePath: '',
      Port: 5100
    }
  }
  const configJson: TConfig = JSON.parse(config)
  
  return configJson
}

export default getServerConfig
