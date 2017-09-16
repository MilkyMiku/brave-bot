const pubg = require('../dataSets/pubgPlaces')
const _ = require('lodash')

module.exports = bot => {
  bot.on('message', function (user, userID, channelID, message, event) {
    if (message.toLowerCase() === '!pubg') {
      bot.sendMessage({
        to: channelID,
        message: `${pubg[_.random(0, pubg.length - 1)]}`
      })
    }
  })
}
