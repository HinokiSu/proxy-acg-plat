const createTable = `CREATE TABLE IF NOT EXISTS "torrent" (
  "_id" TEXT NOT NULL,
  "title" TEXT,
  "publish_user" TEXT,
  "publish_team" TEXT,
  "publish_time" TEXT,
  "tags" TEXT,
  "links" TEXT,
  "img" TEXT,
  "create_at" TEXT,
  "update_at" TEXT
);`

const checkTable = `SELECT name FROM sqlite_master WHERE type='table' AND name='torrent';`

const paginSelect = `SELECT
  * 
  FROM
  torrent 
  ORDER BY
  publish_time DESC,
  create_at DESC 
  LIMIT ? OFFSET ?;`

const calcTotal = `SELECT count(*) as total from torrent;`
export default {
  createTable,
  checkTable,
  paginSelect,
  calcTotal
}
