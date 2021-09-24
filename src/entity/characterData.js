const { entityData } = require('./entityData')

const BLOCK_REGEXP = '<(?<name>[^<>]+)(?:_begin)?>(?<content>[^<>]*)<\\1_end>'
const BMP_FILE_NAME_REGEXP = 'file\\((?<id_start>\\d+)-(?<id_end>\\d+)\\):'
const BMP_FILE_VALUE_REGEXP = '(?<path>.*)\\s*w:\\s*(?<width>\\d+)\\s*h:\\s*(?<height>\\d+)\\s*row:\\s*(?<row>\\d+)\\s*col:\\s*(?<col>\\d+)'

class characterData extends entityData {
    static parseBmp(char, bmpData) {
        bmpData.split('\n')
            .map(line => line.trim())
            .filter(line => Boolean(line))
            .forEach(line => {
                const [name, value] = line.split(/ (.+)/)
                if (!name.includes(':')) {
                    char.params[name.trim()] = Number.parseFloat(value)
                } else if (name.startsWith('name')) {
                    char.name = value
                } else if (name.startsWith('head')) {
                    char.img.head = value
                } else if (name.startsWith('small')) {
                    char.img.small = value
                } else if (name.startsWith('file')) {
                    console.log(name, '***', value)
                    const { id_start, id_end } = name.match(new RegExp(BMP_FILE_NAME_REGEXP)).groups
                    const { path, width, height, row, col } = value.match(new RegExp(BMP_FILE_VALUE_REGEXP)).groups
                    char.img.files.push({ id_start, id_end, path, width, height, row, col })
                } else {
                    throw new Error(`unknown bmp attribute: [${name.trim()}]`)
                }
            })
    }

    static parseFrame(char, frameData) {

    }

    static parse(data) {
        const char = new characterData()

        const reg = new RegExp(BLOCK_REGEXP, 'g')
        let result
        while (result = reg.exec(data)) {
            const { name, content } = result.groups
            switch (name) {
                case 'bmp':
                    this.parseBmp(char, content)
                    break
                case 'frame':
                    this.parseFrame(char, content)
                    break
                default:
                    throw new Error(`unknown block name: [${name}]`)
            }
        }

        return char
    }

    constructor() {
        super()

        this.img = {
            files: []
        }
        this.params = {}
    }
}

module.exports = { characterData }