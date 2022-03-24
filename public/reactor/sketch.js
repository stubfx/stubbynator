let linepos = 0;
let showline = false;
let lineHeight = 0;

socket.on('line', function (value) {
    showline = true;
    lineHeight = parseInt(value);
});

socket.on('clear', () => {
    showline = false;
});

function drawline(p) {
    if (showline) {
        //draw the line
        p.fill(0);
        let realLinePosition = linepos * (100 / lineHeight);
        p.rect(0, (realLinePosition - lineHeight), p.windowWidth, lineHeight);
        linepos++;
        if (realLinePosition >= p.windowHeight + lineHeight) {
            showline = false;
        }
    } else {
        linepos = 0;
    }
}

let sketch = function (p) {
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(120);
    }
    p.draw = function () {
        //p.background(0);
        p.clear();
        drawline(p);
    }
    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
};

new p5(sketch, 'sketchContainer');