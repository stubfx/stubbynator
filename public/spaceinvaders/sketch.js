const socket = io();

socket.on('connect', () => {

});

socket.on('move_spacecraft', (x) => {
    moveBias = x
});

socket.on('reload', () => {
    window.location.reload()
});

// score data
let totalScore = 0
let totalBulletShot = 0
const killAlienScore = 10
const missBulletScore = -1
////////

let gameOver = false
let bullets = []
let patterns = []
let spacecraft = undefined
const ALIEN_SPACING = 40
const ALIEN_DIMENSION = 35
const images = {}
const patternYGen = patternY()

let moveBias = 0

const frame_rate = 60

function* patternY() {
    let patternYSpacing = 0
    while (true) {
        patternYSpacing += ALIEN_SPACING
        yield patternYSpacing
    }
}

function createPatterns() {
    addPattern(new ImagePattern(patternYGen, images.alien_status, images.face_pattern))
}

function addPattern(pattern) {
    if (!(pattern instanceof Pattern)) {
        console.error(pattern.constructor.name + " is not an instance of Pattern.")
        return
    }
    patterns.push(pattern)
}

function preload() {
    // preload() runs once
    const imgPath = '../img/'
    const imgPatternPath = 'space_invaders/patterns/pattern_imgs/'
    images.bullet = loadImage(imgPath + 'pizza.png')
    images.spacecraft = loadImage(imgPath + 'pizzaman.png')
    images.alien_status = {
        full: loadImage(imgPath + 'brainslug.png'),
        half: loadImage(imgPath + 'bibleThump.png')
    }
    images.face_pattern = loadImage(imgPatternPath + 'face.png')
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(frame_rate)
    createPatterns();
    spacecraft = new Spacecraft(windowWidth / 2, windowHeight - 50, images.spacecraft)
}

/**
 * cycles all the bullets and check if every one of those is in contact with an alien.
 */
function checkHit() {
    let tmpBullets = []
    for (let bullet of bullets) {
        for (let pattern of patterns) {
            if (pattern.checkHit(bullet.pos)) {
                // here the bullet is in contact with the alien
                // destroy the bullet
                bullet.kill()
                // since we destroyed an alien, we add "killAlienScore" to "totalScore"
                scoreEvent("alien")
                break;
            }
        }
        // if the bullet is not broken, then we move it to the next frame.
        if (bullet.isAlive) {
            tmpBullets.push(bullet)
        } else {
            // in this case the bullet is dead, but why?
            if (bullet.targetMissed) {
                // in this case the bullet missed the target
                scoreEvent("miss")
            }
        }
    }
    bullets = tmpBullets
}

function shoot() {
    if (frameCount % (frame_rate * 1.5) === 0) {
        bullets.push(new Bullet(spacecraft.pos.x - 8, spacecraft.pos.y, images.bullet))
        totalBulletShot++
    }
}

function moveBullets() {
    for (let bullet of bullets) {
        bullet.move()
        bullet.draw()
    }
}

function movePatterns() {
    for (let pattern of patterns) {
        pattern.move()
        checkHit()
        pattern.draw()
    }
}

function moveSpacecraft() {
    if (moveBias > 0) {
        spacecraft.moveRight()
        moveBias--
    } else if (moveBias < 0) {
        spacecraft.moveLeft()
        moveBias++
    }
    spacecraft.draw()
}

function scoreEvent(eventName) {
    switch (eventName) {
        case "alien":
            totalScore += killAlienScore
            break
        case "miss":
            totalScore += missBulletScore
            break
    }
}

function renderScore() {
    textSize(32);
    fill(255);
    text('Score: ' + totalScore, windowWidth - 500, 50);
}

function renderGameOverScore() {
    // show the score at the center of the screen.
    textAlign(CENTER, CENTER)
    fill(255);
    textSize(150);
    text('Score: ' + totalScore, windowWidth / 2, windowHeight / 2);
    textSize(50);
    text('Bullets fired: ' + totalBulletShot,
        windowWidth / 2, (windowHeight / 2) + 120);
}

function checkGameEnd() {
    gameOver = countAliens() < 1
}

function countAliens() {
    let sum = 0
    for (let pattern of patterns) {
        sum += pattern.getAlienCount()
    }
    return sum
}

function draw() {
    //background(20)
    if (!gameOver) {
        clear() // clear the canvas
        renderScore() // handle the score of the game.
        shoot() // shoot a bullet from the spacecraft location
        movePatterns() // move all the patterns
        moveBullets() // move all bullets in the scene
        moveSpacecraft()
        checkGameEnd()
    } else {
        // game over, show stats
        clear()
        renderGameOverScore()
    }
}