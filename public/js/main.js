function setup() {
    createCanvas(windowWidth, windowHeight)

    window.doTest()
}

function draw() {
    background(220);
    ellipse(50, 50, 80, 80)

    testDraw()
}

function testDraw() {
    if (window.imgData) {
        const data = window.imgData
        const id = frameCount % data.count

        const row = Math.floor(id / data.row)
        const col = id % data.col

        image(
            data.img,
            100, 100,
            data.width, data.height,
            col * data.width + col, row * data.height + row,
            data.width, data.height
        )
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}