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
    if (window.data) {
        const maxId = Math.max(...window.data.img.files.map(item => item.id_end))
        const currentId = frameCount % maxId + 1
        const imgData = window.data.getImage(currentId)
        image(
            imgData.img,
            100, 100,
            imgData.width, imgData.height,
            imgData.x, imgData.y,
            imgData.width, imgData.height
        )
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}