const fs = require('fs')
const _ = require('lodash')
const path = require('path')
const table = require('text-table')

module.exports = (bot) => {
  bot.on('message', (user, userID, channelID, message, event) => {
    console.log(message)
    if (message.startsWith('$') || message.startsWith(':')) {
      if (message === '$list') {
        fs.readdir(`/home/pi/node/brave-bot/soundFiles`, (err, list) => {
          if (err) console.log(err)
          let format = _.flow(_.replace, _.partialRight(_.padEnd, 20))
          bot.sendMessage({
            to: channelID,
            message: table(_.chunk(list.map(str => format(str, '.ogg', '')), 5), {align: ['l', 'l', 'l', 'l', 'l']})
          })
        })
        return
      }

      channelID = bot.getVoiceChannel(event)

      if (message === '$stopsound') {
        bot.getAudioContext(channelID, (error, stream) => {
          if (error) return console.error(error)
          stream.stop()
        })
        return
      }

      bot.joinVoiceChannel(channelID, (error, events) => {
        if (error) console.error(error.message)
        try {
          playSound(channelID, _.replace(_.replace(message.toLowerCase(), '$', ''), /:/g, ''), user)
          bot.sendMessage({
            to: channelID,
            message: `<:imgay:276261810892701696>`
          })
        } catch (e) {
          console.log(e)
        }
      })
    }
  })

  function playSound (channelID, filename, user) {
    // Then get the audio context
    bot.getAudioContext(channelID, (error, stream) => {
      // Once again, check to see if any errors exist
      if (error) return console.error(error)

      // Create a stream to your file and pipe it to the stream
      // Without {end: false}, it would close up the stream, so make sure to include that.
      console.log(user + ' Playing sound:', filename)
      fs.access(path.join(`/home/pi/node/brave-bot/soundFiles`, `${filename}.ogg`), (err) => {
        if (err) {
          bot.sendMessage({
            to: channelID,
            message: 'bad filename'
          })
        } else {
          try {
            var read = fs.createReadStream(
              path.join(`/home/pi/node/brave-bot/soundFiles`, `${filename}.ogg`))
            read.on('open', () => {
              read.pipe(stream, {
                end: false
              })
            })
          } catch (e) {
            bot.sendMessage({
              to: channelID,
              message: 'bad filename'
            })
          }
        }
      })
    })
  }
}
