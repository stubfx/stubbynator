class Empty extends Target {

    constructor(x, y) {
        super("Empty")
        this.pos = createVector(x,y)
    }

    moveTo(pos) {
        this.pos = pos.copy()
    }

    checkHit(pos) {
        return false;
    }

    kill() {
        // nope
    }

    draw() {
        // nope
        //strokeWeight(10); // Make the points 10 pixels in size
        //point(this.pos.x, this.pos.y);
    }

}