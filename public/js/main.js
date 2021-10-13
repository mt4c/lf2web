function setup() {
    createCanvas(windowWidth, windowHeight)

    window.doTest()
}

function draw() {
    background(220);
    ellipse(50, 50, 80, 80)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}