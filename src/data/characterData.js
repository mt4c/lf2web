const global = require('../util/global')
const { entityData } = require('./entityData')

const BLOCK_REGEXP = '<(?<name>[^<>]+)(?:_begin)?>(?<content>[^<>]*)<\\1_end>'

const BMP_FILE_NAME_REGEXP = 'file\\((?<id_start>\\d+)-(?<id_end>\\d+)\\):'
const BMP_FILE_VALUE_REGEXP = '(?<path>.*)\\s*w:\\s*(?<width>\\d+)\\s*h:\\s*(?<height>\\d+)\\s*row:\\s*(?<row>\\d+)\\s*col:\\s*(?<col>\\d+)'

const FRAME_BASE_REGEXP = '(?<id>\\d+)\\s*(?<type>\\S+)'
const FRAME_DATA_REGEXP = '(?<key>[^:\\s]+):\\s*(?<value>\\d+)'
const FRAME_SOUND_REGEXP = 'sound:\\s*(?<path>.+)\\n'
const FRAME_SUB_DATA_REGEXP = '\\s(?<name>\\S+):(?<content>(?:.|\\n)*)\\1_end:'

class characterData extends entityData {
    static parseBmp(char, bmpData) {
        bmpData.split('\n')
            .map(line => line.trim())
            .filter(line => Boolean(line))
            .forEach(line => {
                const [key, value] = line.split(/ (.+)/)
                if (!key.includes(':')) {
                    char.params[key.trim()] = Number.parseFloat(value, 10)
                } else if (key.startsWith('name')) {
                    char.name = value
                } else if (key.startsWith('head')) {
                    char.img.head = value
                } else if (key.startsWith('small')) {
                    char.img.small = value
                } else if (key.startsWith('file')) {
                    const { id_start, id_end } = key.match(new RegExp(BMP_FILE_NAME_REGEXP)).groups
                    const { path, width, height, row, col } = value.match(new RegExp(BMP_FILE_VALUE_REGEXP)).groups
                    char.img.files.push({
                        id_start: Number.parseInt(id_start, 10),
                        id_end: Number.parseInt(id_end, 10),
                        path,
                        width: Number.parseInt(width, 10),
                        height: Number.parseInt(height, 10),
                        row: Number.parseInt(row, 10),
                        col: Number.parseInt(col, 10)
                    })
                } else {
                    throw new Error(`unknown bmp attribute: [${key.trim()}]`)
                }
            })
    }

    static parseFrame(char, frameData) {
        const frame = {}
        const lines = frameData.split('\n')

        const { id, type } = lines[0].match(new RegExp(FRAME_BASE_REGEXP)).groups
        frame.id = Number.parseInt(id, 10)
        frame.type = type

        const dataReg = new RegExp(FRAME_DATA_REGEXP, 'g')
        let result
        while (result = dataReg.exec(lines[1])) {
            const { key, value } = result.groups
            frame[key.trim()] = Number.parseInt(value, 10)
        }

        const soundReg = new RegExp(FRAME_SOUND_REGEXP)
        if (result = soundReg.exec(frameData)) {
            const path = result.groups.path.trim()
            frame.sound = path
        }

        const subDataReg = new RegExp(FRAME_SUB_DATA_REGEXP, 'g')
        while (result = subDataReg.exec(frameData)) {
            const { name, content } = result.groups
            const subObj = {}
            let subResult
            while (subResult = dataReg.exec(content)) {
                const { key, value } = subResult.groups
                subObj[key] = Number.parseInt(value, 10)
            }
            frame[name] = subObj
        }

        char.frames.push(frame)
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
        this.frames = []
    }

    init() {
        this.loadResources()
    }

    loadResources() {
        this.img.files.forEach(fileData => {
            const fullname = 'resources/' + fileData.path
            const window = global.get()
            const imgData = global.get().loadImage(fullname)
            if (!window.imgData) {
                window.imgData = {
                    img: imgData,
                    width: fileData.width,
                    height: fileData.height,
                    row: fileData.row,
                    col: fileData.col,
                    count: fileData.id_end - fileData.id_start
                }
            }
        })
    }
}

module.exports = { characterData }