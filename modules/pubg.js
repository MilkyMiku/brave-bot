const bot = require('./app');
const _ = require('lodash');

bot.on('message', function(user, userID, channelID, message, event) {
  if (message.toLowerCase() === "!pubg") {
    bot.sendMessage({
      to: channelID,
      message: `${pubg[_.random(0,pubg.length)]}`
    });
  }

})
