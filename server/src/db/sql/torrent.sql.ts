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

const fuzzySelectMultiTitle = (keywords: string[]) => {
  let likeSql = `SELECT
  * 
  FROM
  torrent 
  WHERE 
  title LIKE ?
  `

  if (keywords.length > 1) {
    for (let i = 0, len = keywords.length; i < len; i++) {
      if (i !== 0) {
        likeSql = likeSql.concat(` or title LIKE ? `)
      }
    }
  }

  likeSql = likeSql.concat(` ORDER BY 
  publish_time DESC 
  LIMIT ? OFFSET ?;`)

  return likeSql
}

const fuzzySelectMultiTitleTotal = (keywords: string[]) => {
  let likeSql = `SELECT
  count( * ) AS total  
  FROM
  torrent 
  WHERE 
  title LIKE ? 
  `
  if (keywords.length > 1) {
    for (let i = 0, len = keywords.length; i < len; i++) {
      if (i !== 0) {
        likeSql = likeSql.concat(' or title LIKE ? ')
      }
    }
  }
  return likeSql
}
export default {
  checkTable,
  paginSelect,
  calcTotal,
  fuzzySelectTitle,
  fuzzySelectTitleTotal,
  fuzzySelectMultiTitle,
  fuzzySelectMultiTitleTotal
}
