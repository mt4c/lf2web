const global = require('../util/global')

class GameManager {
    constructor(globalObj) {
        global.set(globalObj)
    }
}

module.exports = { GameManager }