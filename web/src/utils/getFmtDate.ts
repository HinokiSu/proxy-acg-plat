import dayjs, { ManipulateType } from 'dayjs'

type TCalc = {
  step: number
  unit: ManipulateType
}
/**
 *
 * @param time time string
 * @param unit if need calc, fill in date type, ex: 'month'
 * @param calc sub or add by unit is step, -1 or 1
 * @param fmt format to which the time string will be converted
 * @returns formatted time string
 */
export const getFormattedDate = (
  time: string,
  fmt = 'YYYY-MM-DDTHH:mm:ss',
  calc: TCalc = {
    step: 0,
    unit: 'month'
  }
) => {
  if (calc.step === 0) return dayjs(time).format(fmt)

  if (calc.step> 0) {
    return dayjs(time).add(calc.step, calc.unit).format(fmt)
  }
  return dayjs(time).subtract(calc.step, calc.unit).format(fmt)
}
