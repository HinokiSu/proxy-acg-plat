import multer from 'multer'
import getServerConfig from '../get-config'

const initMulter = () => {
  const config = getServerConfig()
  const storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, config.UploadPath)
    },
    filename(req, file, callback) {
      console.log(file.originalname)
      callback(null, `${Date.now()}.${file.originalname.split('.').pop() || 'jpg'}`)
    }
  })
  const upload = multer({ storage })
  return upload
}

export default initMulter()
