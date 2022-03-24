class Line extends Pattern {

    constructor(y, alien_status_img, structure) {
        super("Line")
        this.pos = createVector(100, y) // 0 is top.
        this.leftBoundary = 30
        this.rightBoundary = windowWidth - 30
        this.number = 10 // amount of aliens
        this.elements = []
        this.spacing = ALIEN_SPACING
        this.movRight = true
        this.alien_status_img = alien_status_img
        this.structure = structure // [1,0,1,1,1,0,0] 1 = alien, 0 = space
        this.createLine()
    }

    createLine() {
        if (this.structure === undefined) {
            // no structure defined, make a standard line
            this.composeDefaultStructure();
        } else {
            // structure defined, follow this.structure pattern.
            this.composeCustomPattern();
        }
    }

    getAlienCount() {
        let alienSum = 0
        // sum the aliens in each line
        for (let element of this.elements) {
            if (element instanceof Alien) {
                if (element.isAlive){
                    // if is an alien
                    // and is still alive
                    // then we add it to the count
                    alienSum++
                }
            }
        }
        return alienSum
    }

    composeDefaultStructure() {
        // structure defined, follow this.structure pattern.
        for (let i = 0; i < this.number; i++) {
            this.elements.push(new Alien(i * this.spacing, this.pos.y, this.alien_status_img))
        }
    }

    composeCustomPattern() {
        for (let i = 0; i < this.structure.length; i++) {
            if (this.structure[i] === 0) {
                // add the empty space
                this.elements.push(new Empty(i * this.spacing, this.pos.y))
            } else if (this.structure[i] === 1) {
                // add the alien
                this.elements.push(new Alien(i * this.spacing, this.pos.y, this.alien_status_img))
            }
        }
    }

    move() {
        if (this.elements[this.elements.length - 1].pos.x > this.rightBoundary) {
            this.movRight = false
            this.pos.add(0, 50)
        } else if (this.elements[0].pos.x < this.leftBoundary) {
            this.movRight = true
            this.pos.add(0, 50)
        }
        if (this.movRight) {
            this.pos.add(1, 0)
        } else {
            this.pos.sub(1, 0)
        }
        this.moveAliens()
    }

    moveAliens() {
        for (let i = 0; i < this.elements.length; i++) {
            let element = this.elements[i];
            element.moveTo(createVector(this.pos.x + i * this.spacing, this.pos.y))
        }
    }

    checkHit(bulletPos) {
        for (let element of this.elements) {
            if (element.isAlive && element.checkHit(bulletPos)) {
                // in this case hit the alien
                element.hit()
                return true
            }
        }
        return false
    }

    draw() {
        for (let element of this.elements) {
            element.draw()
        }
    }
}