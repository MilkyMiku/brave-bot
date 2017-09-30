let s = require('./sound')
const fs = require('fs')
const _ = require('lodash')

fs.readdir(`/home/pi/node/brave-bot/soundFiles`, (err, files) => {
  if (err) console.log(err)

  files = files.map(file => _.replace(file, '.ogg', ''))

  files.forEach(async (elem) => {
    console.log(await s.create(elem))
  })
})
