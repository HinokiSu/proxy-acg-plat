/**
 * @param _id
 */
const selectById = `SELECT * from anime WHERE _id = ?;`

/**
 * @param zh_name
 * @param en_name
 * @param img
 * @param update_at
 * @param _id
 */
const updateById = `UPDATE anime SET zh_name = ?, en_name = ?, img = ?, update_at = ? WHERE _id = ?;`

/**
 * @param date ('YYYY/MM/dd')
 */
const countSpecifyQuarter = `SELECT count(*) as total FROM anime WHERE start_date > ? and start_date < ? ORDER BY start_date;`

const selectSpecifyQuarter = `SELECT * FROM anime WHERE start_date > ? and start_date < ? ORDER BY start_date;`

const updateAnimeImg = `UPDATE anime SET img = ? WHERE _id = ?`

const selectSpecifyWeekDay = `SELECT * FROM anime WHERE start_week = ?`
export default {
  selectById,
  updateById,
  countSpecifyQuarter,
  selectSpecifyQuarter,
  updateAnimeImg,
  selectSpecifyWeekDay
}
