class Alien extends Target{

    constructor(x, y, img_status) {
        super("Alien")
        this.pos = createVector(x, y)
        this.lifes = 2
        this.isAlive = true
        this.offset = 10
        this.radius = ALIEN_DIMENSION
        this.img_status = img_status
    }

    moveTo(pos) {
        this.pos = pos.copy()
    }

    /**
     * return true if the coordinates are in the alien area
     * false otherwise
     * @param pos
     */
    checkHit(pos) {
        // are those coordinates in my object position?
        // still missing the "HIT!"
        return pos.dist(this.pos) < this.radius;
    }

    hit() {
        this.lifes--
        if (this.lifes < 1) {
            this.isAlive = false
        }
    }

    draw() {
        if (this.isAlive) {
            if (this.lifes > 1) {
                image(this.img_status.full, this.pos.x - this.radius/2,
                    this.pos.y - this.radius/2, this.radius, this.radius)
            } else {
                image(this.img_status.half, this.pos.x - this.radius/2,
                    this.pos.y - this.radius/2, this.radius, this.radius)
            }
        }
    }

}