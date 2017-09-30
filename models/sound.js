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
// a sound object or some shit witht he fields

function dir (sound) {
  return path.join(`/home/pi/node/brave-bot/soundFiles`, `${sound}.ogg`)
}

async function create (sound) {
  const db = new pg.Client()
  await db.connect()
  let rs = fs.createReadStream(dir(sound))
  let meta = await mm(rs, {duration: true})
  console.log(meta)
  rs.close()
  return meta
}

async function update (sound) {

}

// this1 takes the name oft eh sodn
async function read (name) {

}

// asasem shit
async function _delete (name) {

}
