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
const selectByQuarter = `SELECT * FROM anime WHERE start_date > ?;`
const countByQuarter = `SELECT count(*) as total FROM anime WHERE start_date > ?;`
export default {
  selectById,
  updateById,
  selectByQuarter,
  countByQuarter
}
