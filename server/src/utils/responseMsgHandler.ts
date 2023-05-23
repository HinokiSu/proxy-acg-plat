type TResultParams = {
  msg: string
  data?: object
}

export const handleSuccess = ({ msg, data = {} }: TResultParams) => {
  return {
    msg: 'Info: ' + msg,
    status: 200,
    data
  }
}

export const handleFailed = ({ msg, data = {} }: TResultParams) => {
  return {
    msg: 'Error: ' + msg,
    status: 0,
    data
  }
}
