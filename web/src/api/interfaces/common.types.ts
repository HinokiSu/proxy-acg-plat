export type TBaseResult = {
  msg: string
  status: number
  data: object
}

export type TPaginationResult = Omit<TBaseResult, 'data'> & {
  data: {
    total: number
    list: any[]
  }
}

export type TUploadFile = Omit<TBaseResult, 'data'> & {
  file: {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
  }
}
