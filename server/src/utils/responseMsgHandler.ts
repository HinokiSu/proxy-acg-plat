type TResultParams = {
  msg: string
  data?: object
}

export type THandleResult = {
  msg: string
  status: number
  data: any
}

export const handleSuccess = ({
  msg,
  data = {}
}: TResultParams): THandleResult => {
  return {
    msg: 'Info: ' + msg,
    status: 200,
    data
  }
}

export const handleFailed = ({ msg, data }: TResultParams): THandleResult => {
  return {
    msg: 'Error: ' + msg,
    status: 0,
    data
  }
}

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  return String(error)
}
