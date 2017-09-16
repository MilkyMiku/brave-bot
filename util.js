const bot = require('./app');
const _ = require('lodash');

class NoRepeatList {
  constructor(list, noRepeatList) {
    this.list = _.clone(list);
    this.noRep = _.clone(noRepeatList);
  }

  get(size) {
    let entity = list[_.random(0, list.length - 1)];
    if (this.noRep.includes(entity)) {
      this.pick(entity)
    }
    return entity;
  }

  pick(entity) {
    this.list = _.without(this.list, entity);
  }
}


module.exports = {
  NoRepeatList
}
