const fs = require('fs')
const _ = require('lodash')

module.exports = (bot) => {
  bot.on('message', (user, userID, channelID, message, event) => {
    if (message.startsWith('$')) {
      try {
        playSound(bot.getVoiceChannel(event), _.replace(message, '$', ''))
      } catch (e) {
        console.log(e)
      }
    }
  })

  function playSound (channelID, filename) {
    // Let's join the voice channel, the ID is whatever your voice channel's ID is.
    bot.joinVoiceChannel(channelID, function (error, events) {
      // Check to see if any errors happen while joining.
      if (error) return console.error(error)

      // Then get the audio context
      bot.getAudioContext(channelID, function (error, stream) {
        // Once again, check to see if any errors exist
        if (error) return console.error(error)

        // Create a stream to your file and pipe it to the stream
        // Without {end: false}, it would close up the stream, so make sure to include that.
        console.log('Playing sound:', filename)
        fs.createReadStream(`../soundFiles/${filename}.ogg`).pipe(stream, {end: false})

        // The stream fires `done` when it's got nothing else to send to Discord.
        stream.on('done', function () {
          // Handle
        })
      })
    })
  }
}
