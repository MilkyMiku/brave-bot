// this module is gonna record any interesting things happening into a postgreSQL
// database so we can look at them
const sound = require('../models/sound.js')

module.exports = (bot) => {
  bot.on('message', async (user, userID, channelID, message, event) => {
    if (message === '$top10') {
      bot.sendMessage({
        to: userID,
        message: await sound.top10()
      })
      return
    }

    if (message === '$new') {
      bot.sendMessage({
        to: userID,
        message: await sound.new()
      })
      return
    }

    if (message.startsWith('$duration')) {
      let name = message.replace('$duration', '').trim()
      bot.sendMessage({
        to: userID,
        message: await sound.duration(name)
      })
    }
  })
}
