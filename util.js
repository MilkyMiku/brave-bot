const _ = require('lodash')

class NoRepeatList {
  constructor (list, noRepeatList) {
    this.list = _.clone(list)
    this.noRep = _.clone(noRepeatList)
  }

  get () {
    let entity = this.list[_.random(0, this.list.length - 1)]
    if (this.noRep.includes(entity)) {
      this.pick(entity)
    }
    return entity
  }

  pick (entity) {
    this.list = _.without(this.list, entity)
  }
}

module.exports = {
  NoRepeatList
}
