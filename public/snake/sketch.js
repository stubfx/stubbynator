let isSetupDone = false
let snakeArray = []
let foodManagerArray = []
let snakeConfigArray = []

const socket = io();

socket.on('connect', () => {

});

socket.on('feed', (x, y) => {
    addFoodAt(x, y)
});

socket.on('random_feed', () => {
    addFood()
});

socket.on('reload', () => {
    window.location.reload()
});

function createSnakes() {
    for (const configElement of snakeConfigArray) {
        // let posX = -100
        // let posY = -100
        let fm = new FoodManager(width, height, 'orange', configElement.food)
        foodManagerArray.push(fm)
        snakeArray.push(new Snake(fm, configElement.head))
    }
}

function drawFoodManagers() {
    for (const fm of foodManagerArray) {
        fm.draw()
    }
}

function addFood() {
    for (const fm of foodManagerArray) {
        fm.addFoodPiece()
    }
}

function addFoodAt(x, y) {
    for (const fm of foodManagerArray) {
        fm.addFoodPieceAt(x, y)
    }
}

function moveSnakes() {
    for (const snake of snakeArray) {
        snake.move()
        snake.draw()
    }
}

function preload() {
    // preload() runs once
    let imgPath = '/imgs/'
    let pngFileNames = []
    if (window.location.hash.endsWith('rakki')) {
        pngFileNames = [{head: 'rakki_face', food: undefined}]
    } else {
        pngFileNames = [
            {head: 'kappa', food: undefined},
            {head: 'Theilluminati', food: undefined},
            {head: 'rakkAttack', food: undefined},
            {head: 'bibleThump', food: undefined},
            {head: 'brainslug', food: undefined},
            {head: 'FeelsBaguetteMan', food: undefined},
            {head: 'OMEGASP', food: undefined},
            {head: 'FeelsRageMan', food: undefined},
            {head: 'sir_chop_face', food: 'sir_chop_sausage'},
            {head: 'timon_face', food: 'pizza'}
        ]
    }
    for (const el of pngFileNames) {
        snakeConfigArray.push(
            {
                head: loadImage(imgPath + el.head + '.png'),
                food: el.food ? loadImage(imgPath + el.food + '.png') : undefined
            }
        );
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    createSnakes()
    isSetupDone = true
}

function draw() {
    //background(20)
    clear()
    drawFoodManagers()
    moveSnakes()
}

