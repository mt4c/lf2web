function setup() {
    createCanvas(windowWidth, windowHeight)

    window.doTest()
}

function draw() {
    background(220);
    ellipse(50, 50, 80, 80)

    if (window.imgData) {
        image(
            window.imgData.img,
            0, 0,
            window.imgData.width, window.imgData.height,
            0, 0,
            window.imgData.width, window.imgData.height
        )
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}