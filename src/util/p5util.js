class p5Util {
    constructor() {
        this.window = null
    }

    setWindow(newWindow) {
        this.window = newWindow
    }

    loadImage(path) {
        return new Promise((resolve, reject) => {
            this.window.loadImage(path, resolve, reject)
        })
    }

    setTransparent(img) {
        img.loadPixels()
        for (let x = 0; x < img.width; x++) {
            for (let y = 0; y < img.height; y++) {
                const pos = (x + y * img.width) * 4
                if (img.pixels[pos] === 0 && img.pixels[pos + 1] === 0 && img.pixels[pos + 2] === 0) {
                    // black to tranparent
                    img.pixels[pos + 3] = 0
                }
            }
        }
        img.updatePixels()
    }
}

module.exports = new p5Util()