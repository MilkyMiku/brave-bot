const bot = require('./app');
const _ = require('lodash');

bot.on('message', function(user, userID, channelID, message, event) {
  if (message == 'I AM BRAVE') {
    bot.sendMessage({
      to: channelID,
      message: makeBrave(userID)
    });
  }
})

function makeBrave(userID) {
  let results = {}

  results.hero = heros[_.random(0, heros.length - 1)]
  results.lane = lanes[_.random(0, 3)]
  results.laneTime = _.random(1, 7)
  results.talents = [1, 2, 3, 4].map(i => talents[_.random(0, 1)]).join(' ')
  results.ability = skills[_.random(0, 2)]
  results.boots = boots[_.random(0, 5)]
  results.build = [1, 2, 3, 4, 5].map(i => items[_.random(1, items.length - 1)]).join("** -> **")

  return `
  PROVE IT <@!${userID}>.
  Your Hero WILL be **${results.hero}**
  Your Lane WILL be **${results.lane}**
  Your WILL be in your lane for at least **${results.laneTime}** minutes
  Your Talents WILL be ${results.talents}
  Your WILL max ${results.ability} first
  Your boots WILL be **${results.boots}**
  Your build WILL be  **${results.build}**
  `
}

let heros = require('noR')

let talents = [":arrow_left:", ":arrow_right:"]

let skills = [
  ":regional_indicator_q: ",
  ":regional_indicator_w: ",
  ":regional_indicator_e: "
]

let lanes = [
  "Top",
  "Roaming/Jungle",
  "Mid",
  "Bottom"
]
