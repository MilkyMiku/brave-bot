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

const INSERT = `INSERT INTO users(name, duration) VALUES($1, $2) RETURNING *`
const DELETE = ``
const UPDATE = ``
const READ = ``

function dir (name) {
  return path.join(`/home/pi/node/brave-bot/soundFiles`, `${name}.ogg`)
}

async function create (name) {
  let rs = fs.createReadStream(dir(name))
  let stats = fs.statSync(dir(name))
  let meta = await mm(rs, {duration: true})
  let duration = _.round(meta.duration, 2)
  const db = new pg.Client()
  await db.connect()
  console.log(duration)
  console.log(moment(stats.birthtimeMs).format('YYYY-MM-DD HH:MM:SS'))
  rs.close()
  return meta
}

async function update (name) {

}

// this1 takes the name oft eh sodn
async function read (name) {

}

// asasem shit
async function _delete (name) {

}
