import getServerConfig from '../get-config'

export const getSecretKey = () => {
  const config = getServerConfig()
  if (config && config.SecretKey) {
    return config.SecretKey
  }
  console.log(`Error: Get Secret Key failed`)
  return ''
}
