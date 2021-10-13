const SKIP_BYTES = 123
const CIPHER = Buffer.from("odBearBecauseHeIsVeryGoodSiuHungIsAGo")

class dataDecrypter {
    static encrypt(data) {
        throw new Error('not implemented')
    }

    /**
     * decrypt data
     * @param {buffer} data 
     */
    static decrypt(data) {
        const output = Buffer.alloc(data.length - SKIP_BYTES)

        for (let i = SKIP_BYTES; i < data.length; i++) {
            const cipherByte = CIPHER[(i - SKIP_BYTES) % CIPHER.length]
            output[i - SKIP_BYTES] = (data[i] - cipherByte)
        }

        return output.toString()
    }
}

module.exports = { dataDecrypter }