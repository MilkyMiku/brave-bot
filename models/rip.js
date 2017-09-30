let s = require('./sound')
const fs = require('fs')
const _ = require('lodash')
// const db = require('../db')
const pg = require('pg')
const path = require('path')

fs.readdir(`/home/pi/node/brave-bot/soundFiles`, async (err, files) => {
  if (err) console.log(err)

  files = files.map(file => _.replace(file, '.ogg', ''))

  files.forEach((elem) => {
    let stats = fs.statSync(path.join(`/home/pi/node/brave-bot/soundFiles`, `${elem}.ogg`))
    console.log(stats.birthtime)
  })

  // let db = new pg.Client()
  // await db.connect()
  // files.forEach(async (elem) => {
  //   console.log(await s.create(elem, db))
  // })
})
