let _global = null

const global = {
    set: function (newGlobal) {
        _global = newGlobal
    },

    get: function () {
        return _global
    }
}

module.exports = global