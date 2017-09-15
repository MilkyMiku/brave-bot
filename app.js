var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Discord = require('discord.io');

var index = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8080, ()=>{
  console.log('listening 8080');
})



var bot = new Discord.Client({
    token: "MzU0MDg1NzM5MzE2OTAzOTQw.DI5Hqg.7JG3tdvrVTh7DXPbPHzaZjsyjEg",
    autorun: true
});

bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
    bot.setPresence({game:{name:"ULTIMATE BRAVERY"}})
});

bot.on('message', function(user, userID, channelID, message, event) {
    if (message === "ping") {
        bot.sendMessage({
            to: channelID,
            message: "pong"
        });
    }

    if (message == 'I AM BRAVE') {
      bot.sendMessage({
          to: channelID,
          message: makeBrave(userID)
      });
    }

    if (message.toLowerCase() === "!pubg") {
      bot.sendMessage({
          to: channelID,
          message: `${pubg[roll(0,pubg.length)]}`
      });
    }

    if (message.startsWith("!roll")) {
      bot.sendMessage({
        to: channelID,
        message: doRoll(message)
      })
    }

    if (message === '!flip') {
      let flip = ['Heads', 'Tails']
      bot.sendMessage({
        to: channelID,
        message: flip[roll(0,1)]
      })
    }

    if (message === 'DUCE') {
      bot.sendMessage({
        to: channelID,
        message: 'DUCE DUCE DUCE'
      })
    }
});

bot.on('disconnect', function(errMsg, code) {
  bot.connect()
});

function doRoll(message){
  let parts = message.split(' ')
  if (parts.length === 1) {
    return roll(1, 99)
  }

  if (parts.length === 2) {
    try {
      return roll(1, parseInt(parts[1]), 10)
    } catch (e) {
      return 'dont fuck with me'
    }
  }

  if (parts.length === 3) {
    try {
      return roll(parseInt(parts[1], 10), parseInt(parts[2]), 10)
    } catch (e) {
      return 'dont fuck with me'
    }
  }

  return 'thats not how you do that'
}

function makeBrave(userID) {
  let results = {}

  results.hero = heros[roll(0, heros.length-1)]
  results.lane = lanes[roll(0, 3)]
  results.laneTime = roll(1, 7)
  results.talents = [1, 2, 3, 4].map(i => talents[roll(0, 1)]).join(' ')
  results.ability = skills[roll(0, 2)]
  results.boots = boots[roll(0, 5)]
  results.build = [1, 2, 3, 4, 5].map(i => items[roll(1, items.length-1)]).join("** -> **")

  return  `
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

function teamBrave(userID){

}

function roll(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getItems(){

}

let talents = [":arrow_left:", ":arrow_right:"]

let items = [
  'Magic Wand',
  'Glimmer Cape',
  'Mask of Madness',
  'Iron Talon',
  'Armlet of Mordiggian',
  'Helm of The Dominator',
  'Veil of Discord',
  'Blade Mail',
  'Shadow Blade',
  'Poor Mans Shield',
  'Aether Lens',
  'Urn of Shadows',
  'Necronomicon',
  'Crimson Guard',
  'Battle Fury',
  'Dagon',
  'Black King Bar',
  'Ethereal Blade',
  'Echo Sabre',
  'Ring of Aquila',
  'Euls Scepter of Divinity',
  'Lotus Orb',
  'Silver Edge',
  'Solar Crest',
  'Shivas Guard',
  'Radiance',
  'Diffusal Blade',
  'Rod of Atos',
  'Bloodstone',
  'Monkey King Bar',
  'Desolator',
  'Drums of Endurance',
  'Orchid Malevolence',
  'Manta Style',
  'Daedalus',
  'Heavens Halberd',
  'Hand of Midas',
  'Mekansm',
  'Aghanims Scepter',
  'Linkens Sphere',
  'Butterfly',
  'Sange and Yasha',
  'Vladmirs Offering',
  'Refresher Orb',
  'Hurricaine Pike',
  'Divine Rapier',
  'Eye of Skadi',
  'Moonshard',
  'Pipe of Insight',
  'Scythe of Vyse',
  'Assault Cuirass',
  'Abyssal Blade',
  'Mjollnir',
  'Octarine Core',
  'Heart of Tarrasque',
  'Bloodthorn',
  'Satanic'
]

let boots = [
  "Tranquil Boots",
  "Phase Boots",
  "Power Treads",
  "Boots of Travel",
  "Guardian Greaves",
  "Arcane Boots"
]

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

let heros = [
  "Abaddon",
  "Alchemist",
  "Ancient Apparition",
  "Anti-Mage",
  "Arc Warden",
  "Axe",
  "Bane",
  "Batrider",
  "Beastmaster",
  "Bloodseeker",
  "Bounty Hunter",
  "Brewmaster",
  "Bristleback",
  "Broodmother",
  "Centaur Warrunner",
  "Chaos Knight",
  "Chen",
  "Clinkz",
  "Clockwerk",
  "Crystal Maiden",
  "Dark Seer",
  "Dazzle",
  "Death Prophet",
  "Disruptor",
  "Doom",
  "Dragon Knight",
  "Drow Ranger",
  "Earth Spirit",
  "Earthshaker",
  "Elder Titan",
  "Ember Spirit",
  "Enchantress",
  "Enigma",
  "Faceless Void",
  "Gyrocopter",
  "Huskar",
  "Invoker",
  "Io",
  "Jakiro",
  "Juggernaut",
  "Keeper of the Light",
  "Kunkka",
  "Legion Commander",
  "Leshrac",
  "Lich",
  "Lifestealer",
  "Lina",
  "Lion",
  "Lone Druid",
  "Luna",
  "Lycan",
  "Magnus",
  "Medusa",
  "Meepo",
  "Mirana",
  "Morphling",
  "Monkey King",
  "Naga Siren",
  "Nature's Prophet",
  "Necrophos",
  "Night Stalker",
  "Nyx Assassin",
  "Ogre Magi",
  "Omniknight",
  "Oracle",
  "Outworld Devourer",
  "Phantom Assassin",
  "Phantom Lancer",
  "Phoenix",
  "Puck",
  "Pudge",
  "Pugna",
  "Queen of Pain",
  "Razor",
  "Riki",
  "Rubick",
  "Sand King",
  "Shadow Demon",
  "Shadow Fiend",
  "Shadow Shaman",
  "Silencer",
  "Skywrath Mage",
  "Slardar",
  "Slark",
  "Sniper",
  "Spectre",
  "Spirit Breaker",
  "Storm Spirit",
  "Sven",
  "Techies",
  "Templar Assassin",
  "Terrorblade",
  "Tidehunter",
  "Timbersaw",
  "Tinker",
  "Tiny",
  "Treant Protector",
  "Troll Warlord",
  "Tusk",
  "Undying",
  "Ursa",
  "Vengeful Spirit",
  "Venomancer",
  "Viper",
  "Visage",
  "Warlock",
  "Weaver",
  "Windranger",
  "Winter Wyvern",
  "Witch Doctor",
  "Wraith King",
  "Zeus"
]

let pubg = [
  "Zharki",
  "Severny",
  "Shooting Range",
  "Stalber",
  "Georgopol",
  "Houston",
  "Ruins",
  "Roznok",
  "Yasnaya-Polyana",
  "Mansion",
  "Lipovka",
  "Hospital",
  "School",
  "Gatka",
  "Pochinki",
  "Bunker",
  "Prison",
  "Power Plant",
  "Mylta",
  "Farm",
  "HEAD FOR THE QUARRY",
  "Primorsk",
  "Ferry Pier",
  "Military Base",
  "Novoroponya",
  "Spawn Island"
]

module.exports = app;
