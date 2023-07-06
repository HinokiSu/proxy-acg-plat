/**
 * 
 * @param val string or number
 * @returns string, the day
 */

export const getWeekDayStr = (val: number | string) => {
  const flag = typeof val === 'string' ? parseInt(val) : val
  if (flag > 6)
    console.log('Error: Get Week Day String, value params exceed [0-6] range')
  const weekList = [
    '星期天',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ]

  return weekList[flag]
}
