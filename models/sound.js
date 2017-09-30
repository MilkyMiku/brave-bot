module.exports = {
  create,
  read,
  update,
  delete: _delete,
  played,
  top10,
  new: _new
}

// const db = require('../db')
const fs = require('fs')
const promisify = require('util').promisify
const mm = promisify(require('musicmetadata'))
const path = require('path')
const pg = require('pg')
const moment = require('moment')
const _ = require('lodash')

var db = new pg.Client()
db.connect()

const INSERT = `INSERT INTO sound(name, duration, upload, playcount) VALUES($1, $2, $3, $4) RETURNING *`
const DELETE = ``
const UPDATE = `UPDATE sound SET playcount = $1 WHERE name = $2`
const READ = `SELECT * FROM sound WHERE name = $1`

function dir (name) {
  return path.join(`/home/pi/node/brave-bot/soundFiles`, `${name}.ogg`)
}

async function create (name) {
  try {
    // get info
    let rs = fs.createReadStream(dir(name))
    let stats = fs.statSync(dir(name))
    let upload = moment(stats.birthtime).format('YYYY-MM-DD HH:mm:ss')
    let meta = await mm(rs, {duration: true})
    let duration = _.round(meta.duration, 2)
    rs.close()

    // send to db
    // var db = new pg.Client()
    let res = await db.query(INSERT, [name, duration, upload, 1])
    return res
  } catch (e) {
    return e
  }
}

async function update (name) {

}

// this1 takes the name oft eh sodn
async function read (name, string) {
  try {
    let res = await db.query(string || READ, [name])
    return res
  } catch (e) {
    return e
  }
}

// asasem shit
async function _delete (name) {

}

// asasem shit
async function played (name) {
  // get record playcount
  try {
    let count = await read(name, `SELECT playcount FROM sound WHERE name = $1`)
    // console.log(count.rows[0].playcount)
    let res = await db.query(UPDATE, [++count.rows[0].playcount, name])
    // console.log(res)
  } catch (e) {
    console.log(e)
    // make a new record if doesnt exist
    create(name)
  }
}

// return the top 10 most played
async function top10 () {
  try {
    let res = await db.query(`SELECT name, playcount FROM sound ORDER BY playcount LIMIT 10`)
    let str = '\n'
    res.rows.forEach((row) => {
      str += `${row.playcount}\t${row.name}\n`
    })
    return str
  } catch (e) {
    return 'something broke' + e
  }
}

// return 10 newest sounds
async function _new () {

}
