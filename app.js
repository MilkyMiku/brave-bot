var Discord = require('discord.io')
const _ = require('lodash')

var bot = new Discord.Client({
  token: 'MzU0MDg1NzM5MzE2OTAzOTQw.DI5Hqg.7JG3tdvrVTh7DXPbPHzaZjsyjEg',
  autorun: true
})

bot.on('ready', function () {
  console.log('Logged in as %s - %s\n', bot.username, bot.id)
  bot.setPresence({
    game: {
      name: 'ULTIMATE BRAVERY'
    }
  })
})

bot.on('disconnect', function (errMsg, code) {
  bot.connect()
})

bot.getVoiceChannel = (event) => {
  return _.findKey(bot.channels, (channel) => {
    return _.has(channel.members, event.d.author.id)
  })
}

// require modules
require('./modules/misc')(bot)
require('./modules/ultimatebravery')(bot)

module.exports = bot
