const { entity } = require('./entity')

class character extends entity {
    static parse(data) {
        return new character()
    }
}

module.exports = { character }