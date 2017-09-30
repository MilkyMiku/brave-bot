module.exports = {
  create,
  read,
  update,
  delete: _delete
}

// const db = require('../db')
const fs = require('fs')
const promisify = require('util').promisify
const mm = promisify(require('musicmetadata'))
const path = require('path')
const pg = require('pg')
const moment = require('moment')
const _ = require('lodash')

const INSERT = `INSERT INTO sound(name, duration, upload, playcount) VALUES($1, $2, $3, $4) RETURNING *`
const DELETE = ``
const UPDATE = ``
const READ = `SELECT * FROM sound WHERE name = $1`

function dir (name) {
  return path.join(`/home/pi/node/brave-bot/soundFiles`, `${name}.ogg`)
}

async function create (name, db) {
  try {
    // get info
    let rs = fs.createReadStream(dir(name))
    let stats = fs.statSync(dir(name))
    let upload = moment(stats.birthtimeMs).format('YYYY-MM-DD HH:MM:SS')
    let meta = await mm(rs, {duration: true})
    let duration = _.round(meta.duration, 2)
    rs.close()

    // send to db
    // var db = new pg.Client()
    let res = await db.query(INSERT, [name, duration, upload, 0])
    return res
  } catch (e) {
    return e
  }
}

async function update (name) {

}

// this1 takes the name oft eh sodn
async function read (name) {
  try {
    var db = new pg.Client()
    await db.connect()
    let res = await db.query(READ, [name])
    return res
  } catch (e) {
    return e
  } finally {
    db.end()
  }
}

// asasem shit
async function _delete (name) {

}
