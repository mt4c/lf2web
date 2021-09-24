const fs = require('fs-extra')
const path = require('path')
const chai = require('chai')
chai.should()
const expect = chai.expect
const { dataDecrypter } = require('../src/data/dataDecrypter')

describe('dataCipher', () => {
    it('template.dat', async () => {
        const data = await fs.readFile(path.resolve(__dirname, '../resources', 'data', 'template.dat'))
        const decrypter = new dataDecrypter()
        const decoded = decrypter.decrypt(data)
        console.log(decoded)
    })
})