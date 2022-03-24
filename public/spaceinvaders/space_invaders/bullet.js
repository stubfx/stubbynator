class Bullet {

    constructor(x, y, img) {
        this.pos = createVector(x, y)
        this.isAlive = true
        this.radius = 20
        this.img = img
        this.targetMissed = false
    }

    move() {
        // assume is moving only on y
        // if the bullet goes over the screen (aka over the top) then kill it.
        if (this.pos.y < 0) {
            this.isAlive = false
            this.targetMissed = true
            return
        }
        this.pos.sub(0, 2)
    }

    kill() {
        this.isAlive = false
    }

    draw() {
        if (this.isAlive) {
            fill('red');
            // rect(this.pos.x - 1,
            //     this.pos.y - 6, 2, 12);
            image(this.img, this.pos.x - this.radius/2,
                this.pos.y - this.radius/2, this.radius, this.radius)
        }
    }

}