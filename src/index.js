import "core-js/stable"
import "regenerator-runtime"
const { GameManager } = require('./manager/gameManager')
const { dataDecrypter } = require('./data/dataDecrypter')
const { characterData } = require('./data/characterData')

window.gameManager = new GameManager(window)

window.doTest = async function () {
    const response = await window.fetch('resources/data/template.dat')
    const encrypted = Buffer.from(await response.arrayBuffer())
    const decrypted = dataDecrypter.decrypt(encrypted)
    const templateData = characterData.parse(decrypted)
    await templateData.init()
    window.data = templateData
}
