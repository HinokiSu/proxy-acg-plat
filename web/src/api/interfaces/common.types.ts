export type TBaseResult = {
  msg: string
  status: string
  data: object
}

export type TPaginationResult = Omit<TBaseResult, 'data'> & {
  data: {
    total: number
    list: any[]
  }
}
