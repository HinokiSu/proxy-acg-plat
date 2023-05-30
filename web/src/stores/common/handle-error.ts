export const handleError = (res: any) => {
  if (!res.status) {
    // TODO: Global show error msg
    return console.log('Msg: ' + res.msg)
  }
}
