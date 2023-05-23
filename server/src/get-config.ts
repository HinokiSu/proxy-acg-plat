import fs from 'fs/promises'
import path from 'path'

type TConfig = {
  DataBaseURL: string
  Port: number
}
const getServerConfig = async () => {
  const configPath = path.join(process.cwd(), path.sep, 'server.config.json')
  const config = await fs.readFile(configPath, 'utf-8')
  if (!config) {
    console.log(`Error: Config is empty!!, config path: ${configPath}`)
    return {
      DataBaseURL: '',
      Port: 5100
    }
  }
  const configJson: TConfig = JSON.parse(config)
  
  return configJson
}

export default getServerConfig
