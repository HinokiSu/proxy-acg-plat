import { createSqlField, createSqlValuesMark } from '../../utils/sqlFormatter'

const fieldOfUserTable = [
  '_id',
  'name',
  'email',
  'password',
  'role',
  'create_at'
]
const checkTable = `SELECT name FROM sqlite_master WHERE type='table' AND name='user';`

const createTable = `CREATE TABLE IF NOT EXISTS "user" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "create_at" TEXT
);`

const insert = `INSERT INTO user (${createSqlField(
  fieldOfUserTable
)}) VALUES (${createSqlValuesMark(fieldOfUserTable)})`

/**
 * @param email
 * @param password
 */
const checkUser = `SELECT _id, name, role, email FROM user where email = ? and password = ?;`

/**
 * @param email
 */
const findOne = `SELECT * FROM user WHERE email = ? LIMIT 1;`


export default {
  checkTable,
  createTable,
  insert,
  checkUser,
  findOne
}
