const fs = require('fs-extra')
const path = require('path')
const chai = require('chai')
chai.should()
const expect = chai.expect
const { dataDecrypter } = require('../src/data/dataDecrypter')

describe('dataDecrypter', () => {
    it('data/template.dat', async () => {
        const data = await fs.readFile(path.resolve(__dirname, '../resources/data/template.dat'))
        const result = (await fs.readFile(path.resolve(__dirname, 'data/template.txt'))).toString()
        const decrypter = new dataDecrypter()
        const decoded = decrypter.decrypt(data)
        decoded.should.eqls(result)
    })

    it('data/weapon0.dat', async () => {
        const data = await fs.readFile(path.resolve(__dirname, '../resources/data/weapon0.dat'))
        const result = (await fs.readFile(path.resolve(__dirname, 'data/weapon0.txt'))).toString()
        const decrypter = new dataDecrypter()
        const decoded = decrypter.decrypt(data)
        decoded.should.eqls(result)
    })

    it('bg/sys/cuhk/bg.dat', async () => {
        const data = await fs.readFile(path.resolve(__dirname, '../resources/bg/sys/cuhk/bg.dat'))
        const result = (await fs.readFile(path.resolve(__dirname, 'data/cuhk.txt'))).toString()
        const decrypter = new dataDecrypter()
        const decoded = decrypter.decrypt(data)
        decoded.should.eqls(result)
    })
})