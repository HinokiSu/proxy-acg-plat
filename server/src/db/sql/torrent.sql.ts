const checkTable = `SELECT name FROM sqlite_master WHERE type='table' AND name='torrent';`

const paginSelect = `SELECT
  * 
  FROM
  torrent 
  ORDER BY
  publish_time DESC 
  LIMIT ? OFFSET ?;`

const calcTotal = `SELECT count(*) as total from torrent;`

/**
 * @param keyword
 * @param limit
 * @param offset
 */
const fuzzySelectTitle = `
  SELECT
  * 
  FROM
  torrent 
  WHERE
  title LIKE ? 
  ORDER BY
  publish_time DESC 
  LIMIT ? OFFSET ?;`

const fuzzySelectTitleTotal = `
  SELECT
	count( * ) AS total 
FROM
	torrent 
WHERE
	title LIKE ?;`
export default {
  checkTable,
  paginSelect,
  calcTotal,
  fuzzySelectTitle,
  fuzzySelectTitleTotal
}
