import dayjs from 'dayjs'

const getCurrentQuarter = () => {
  /* start month 0 */
  const quarter = [
    {
      flag: 'Q1',
      startMon: 0,
      date: '01/01'
    },
    {
      flag: 'Q2',
      startMon: 3,
      date: '04/01'
    },
    {
      flag: 'Q3',
      startMon: 6,
      date: '07/01'
    },
    {
      flag: 'Q4',
      startMon: 9,
      date: '10/01'
    }
  ]
  const month = dayjs().get('month')
  const year = dayjs().get('year')
  console.log(month)

  for (const item of quarter) {
    if (month >= item.startMon && month <= item.startMon + 2) {
      return year + '/' + item.date
    }
  }
  return year + '/' + (month + 1) + '/01'
}

export default getCurrentQuarter
