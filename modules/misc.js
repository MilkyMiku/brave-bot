const bot = require('../app');
const _ = require('lodash');
const util = require('../util');

module.exports = (bot) => {

  bot.on('message', function(user, userID, channelID, message, event) {
    if (message.startsWith("!_.random")) {
      bot.sendMessage({
        to: channelID,
        message: doRoll(message)
      })
    }

    if (message === "ping") {
      console.log(user);
      console.log(JSON.stringify(event, null, 2));

      console.log(bot.getVoiceChannel(event));
      bot.sendMessage({
        to: channelID,
        message: "pong"
      });
    }

    if (message === '!flip') {
      let flip = ['Heads', 'Tails']
      bot.sendMessage({
        to: channelID,
        message: flip[_.random(0, 1)]
      })
    }

    if (message === 'DUCE') {
      //play Duce soundclip
    }

  })

  function doRoll(message) {
    let parts = message.split(' ')
    if (parts.length === 1) return _.random(1, 99)
    if (parts.length === 2) return _.random(1, parseInt(parts[1]), 10)
    if (parts.length === 3) return _.random(parseInt(parts[1], 10), parseInt(parts[2]), 10)
    return 'thats not how you do that'
  }
}
