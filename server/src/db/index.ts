import * as Mongoose from 'mongoose'
import getServerConfig from '../get-config'
let database: Mongoose.Connection
export const dbConnect = async () => {
  // add your own uri below
  const config = await getServerConfig()
  const uri = config.DataBaseURL
  if (database) {
    return
  }
  await Mongoose.connect(uri)
}
export const dbDisconnect = async () => {
  if (!database) {
    return
  }
  await Mongoose.disconnect()
}
