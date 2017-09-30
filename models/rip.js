let s = require('./sound')
const fs = require('fs')
const _ = require('lodash')
// const db = require('../db')
const pg = require('pg')
const path = require('path')
const moment = require('moment')

fs.readdir(`/home/pi/node/brave-bot/soundFiles`, async (err, files) => {
  if (err) console.log(err)

  files = files.map(file => _.replace(file, '.ogg', ''))
  //
  // files.forEach((elem) => {
  //   let stats = fs.statSync(path.join(`/home/pi/node/brave-bot/soundFiles`, `${elem}.ogg`))
  //   console.log(stats.birthtime + '  -------  ' + moment(stats.birthtime).format('YYYY-MM-DD HH:MM:SS'))
  // })

  let db = new pg.Client()
  await db.connect()
  files.forEach(async (elem) => {
    console.log(await s.create(elem, db))
  })
})
