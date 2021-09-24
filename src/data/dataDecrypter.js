const SKIP_BYTES = 123
const CIPHER = Buffer.from("odBearBecauseHeIsVeryGoodSiuHungIsAGo")

class dataDecrypter {
    encrypt(data) {

    }

    /**
     * decrypt data
     * @param {buffer} data 
     */
    decrypt(data) {
        const output = Buffer.alloc(data.length - 123)

        for (let i = 123; i < data.length; i++) {
            const cipherByte = CIPHER[(i - 123) % CIPHER.length]
            output[i - 123] = (data[i] - cipherByte)
        }

        return output.toString()
    }
}

module.exports = { dataDecrypter }