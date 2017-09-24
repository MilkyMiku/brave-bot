const fs = require('fs')
const _ = require('lodash')
const path = require('path')

module.exports = (bot) => {
  bot.on('message', (user, userID, channelID, message, event) => {
    if (userID !== bot.id) console.log(`${user} said ${message}`)
    if (message.startsWith('$')) {
      if (message.startsWith('$list')) {
        let keyword = message.replace('$list', '').trim()
        fs.readdir(`/home/pi/node/brave-bot/soundFiles`, (err, files) => {
          if (err) console.log(err)
          if (keyword === '') {
            bot.sendMessage({
              to: userID,
              message: 'Currently there are: ' + files.length + ' sounds'
            })
            list(files, userID)
          } else {
            search(files, userID, keyword)
          }
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
          playSound(channelID, _.replace(message.toLowerCase(), '$', ''), user)
        } catch (e) {
          console.log(e)
        }
      })
    }
  })

  function list (files, userID) {
    files = _.chunk(files.map(file => _.padEnd(_.replace(file, '.ogg', ''), 25)), 4)
    let str = '```'
    let lists = []
    files.forEach((row) => {
      str += row.join('\t') + '\n'
      if (str.length > 1800) {
        lists.push(str + '```')
        str = '```'
      }
    })
    lists.push(str + '```')
    lists.forEach((list, i) => {
      setTimeout(() => {
        bot.sendMessage({
          to: userID,
          message: list
        })
      }, i * 1000)
    })
  }

  function search (files, userID, keyword) {
    console.log(keyword)
    console.log(files.length)
    files = files.filter(file => file.includes(keyword))
    console.log(files)
    list(files, userID)
  }

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
