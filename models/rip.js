let s = require('./sound')
const fs = require('fs')
const _ = require('lodash')
const db = require('../db')

fs.readdir(`/home/pi/node/brave-bot/soundFiles`, async (err, files) => {
  if (err) console.log(err)

  files = files.map(file => _.replace(file, '.ogg', ''))

  await db.connect()
  files.forEach(async (elem) => {
    console.log(await s.create(elem, db))
  })
})
