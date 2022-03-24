let w = 1920;
let h = 1080;
const TEXT_SHIFT = -200;

let drops = [];


function addDrop(messageWrapper) {
    if (messageWrapper && messageWrapper.message) {
        drops.push(new ChatTextDrop(messageWrapper, random(TEXT_SHIFT, windowWidth+TEXT_SHIFT), random(-windowHeight*1.5, -10)));
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(120);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    clear();
    drops.forEach(function (drop, i){
        drop.update();
        drop.draw();
    });
    drops = drops.filter((value, index, array) => !value.isdead);
}