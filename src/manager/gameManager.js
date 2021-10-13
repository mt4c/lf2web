const p5Util = require('../util/p5util')

class GameManager {
    constructor(window) {
        p5Util.setWindow(window)
    }
}

module.exports = { GameManager }