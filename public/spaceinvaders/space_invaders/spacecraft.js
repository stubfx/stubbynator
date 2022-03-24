class Spacecraft {

    constructor(x, y, img) {
        this.pos = createVector(x, y)
        this.offset = 10
        this.radius = 60
        this.movRight = true
        this.img = img
    }

    moveRight() {
        let rfix = this.radius / 2
        if (this.pos.x + rfix >= windowWidth) return
        this.pos.add(2, 0)
    }

    moveLeft() {
        let rfix = this.radius / 2
        if (this.pos.x - rfix <= 0) return
        this.pos.sub(2, 0)
    }

    moveDefault() {
        let rfix = this.radius / 2
        // why is it bouncing on the left? aka this.pos.x < 0
        if (this.pos.x - rfix <= 0 || this.pos.x + rfix >= windowWidth) {
            this.movRight = !this.movRight
        }
        if (this.movRight) {
            // move only on x
            this.pos.add(2, 0)
        } else {
            // move only on x
            this.pos.sub(2, 0)
        }
    }

    draw() {
        fill('blue');
        // circle(this.pos.x, this.pos.y,
        //     this.radius);
        image(this.img, this.pos.x - this.radius/2, this.pos.y - this.radius/2, this.radius, this.radius)
    }

}