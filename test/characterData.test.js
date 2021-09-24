const fs = require('fs-extra')
const path = require('path')
const chai = require('chai')
chai.should()
const expect = chai.expect
const { characterData } = require('../src/entity/characterData')

describe('character', () => {
    it.only('template', async () => {
        const data = (await fs.readFile(path.resolve(__dirname, 'data/template.txt'))).toString()
        const char = characterData.parse(data)
        console.log(char)
    })
})