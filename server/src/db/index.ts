import Database from 'better-sqlite3'
import TorrentSql from './sql/torrent.sql'
import getServerConfig from '../get-config'

const config = getServerConfig()
const DBPath = config.DataBasePath
console.log(`Info: DB path: ${DBPath}`)
const db = new Database(DBPath)
db.pragma('journal_mode = WAL')

const initDB = () => {
  // check logs table
  const torrentTBStmt = db.prepare(TorrentSql.checkTable)
  const torrentTBRow = torrentTBStmt.get()
  if (torrentTBRow === undefined) {
    return console.log(`Error: DB is not exist!`)
  }
}
initDB()

function query(sql: string, params: any[] = []): any[] {
  return db.prepare(sql).all(params)
}

function get(sql: string, params: any[] = []): any {
  return db.prepare(sql).get(params)
}

function run(sql: string, params: any[]) {
  return db.prepare(sql).run(params)
}

function exec(sql: string) {
  return db.exec(sql)
}

export default { run, query, get, exec }
