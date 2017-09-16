const fs = require('fs')
const _ = require('lodash')
const path = require('path')

module.exports = (bot) => {
  bot.on('message', (user, userID, channelID, message, event) => {
    if (message.startsWith('$')) {
      try {
        // try to join correct channel
        bot.joinVoiceChannel(channelID, (error, events) => {
          if (error) return console.error(error)
        })
      } catch (e) {
        if (e.message.includes('Voice channel already active')) {
          // everythings fine
        } else {
          console.log(e)
          return
        }
      }

      try {
        playSound(bot.getVoiceChannel(event), _.replace(message, '$', ''))
      } catch (e) {
        console.log(e)
      }
    }
  })

  function playSound (channelID, filename) {
    // Then get the audio context
    bot.getAudioContext(channelID, (error, stream) => {
      // Once again, check to see if any errors exist
      if (error) return console.error(error)

      // Create a stream to your file and pipe it to the stream
      // Without {end: false}, it would close up the stream, so make sure to include that.
      console.log('Playing sound:', filename)
      let read = fs.createReadStream(
        path.join(`/home/pi/node/brave-bot/soundFiles`, `${filename}.ogg`))
      console.log('Stream made', __dirname)

      read.on('open', () => {
        console.log('in open event', __dirname)
        read.pipe(stream, {
          end: false
        })
        console.log('after pipe')
      })
      // The stream fires `done` when it's got nothing else to send to Discord.
      stream.on('done', () => {
        // Handle
      })

      stream.on('error', (error) => {
        console.log(error)
      })
    })
  }
}
