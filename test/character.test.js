const fs = require('fs-extra')
const path = require('path')
const chai = require('chai')
chai.should()
const expect = chai.expect
const { character } = require('../src/entity/character')

describe('character', () => {
    it('template', async () => {
        const data = (await fs.readFile(path.resolve(__dirname, 'data/template.txt'))).toString()
        const char = character.parse(data)
        console.log(char)
    })
})