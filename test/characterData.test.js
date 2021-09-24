const fs = require('fs-extra')
const path = require('path')
const chai = require('chai')
chai.should()
const expect = chai.expect
const { characterData } = require('../src/entity/characterData')

describe('character', () => {
    it('template', async () => {
        const data = (await fs.readFile(path.resolve(__dirname, 'data/template.txt'))).toString()
        const char = characterData.parse(data)
        char.name.should.eqls('Template')
        char.img.files.should.have.length(2)
        char.img.files[1].id_end.should.eqls(139)
        char.frames.should.have.length(144)
        const lastFrame = char.frames[char.frames.length - 1]
        lastFrame.id.should.eqls(399)
        lastFrame.type.should.eqls('dummy')
        lastFrame.pic.should.eqls(0)
        lastFrame.bdy.kind.should.eqls(0)
    })

    it('davis', async () => {
        const data = (await fs.readFile(path.resolve(__dirname, 'data/davis.txt'))).toString()
        const char = characterData.parse(data)
        char.name.should.eqls('Davis')
        char.img.files.should.have.length(3)
        char.img.files[1].id_end.should.eqls(139)
        char.frames.should.have.length(221)
        char.frames[0].type.should.eqls('standing')
        char.frames[0].wpoint.weaponact.should.eqls(23)
        char.frames[8].sound.should.eqls('data\\003.wav')
        const lastFrame = char.frames[char.frames.length - 1]
        lastFrame.id.should.eqls(399)
        lastFrame.type.should.eqls('dummy')
        lastFrame.pic.should.eqls(0)
        lastFrame.bdy.kind.should.eqls(0)
    })
})