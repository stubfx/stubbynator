class ImagePattern extends Pattern {

    constructor(YPatternGenerator, alien_status_img, image) {// image: p5.Image
        super("imagePattern")
        this.lines = []
        this.image = image
        this.imageHeight = 20
        this.imageWidth = this.image.width
        this.YPatternGenerator = YPatternGenerator
        this.alien_status_img = alien_status_img
        this.image.loadPixels()
        this.createPattern()
    }

    createPattern() {
        // read the image data.
        const imageMultiplier = 4
        for (let i = 0; i < this.imageHeight; i++) {
            let structure = []
            for (let j = 0; j < this.imageWidth; j++) {
                if (this.image.pixels[(this.imageWidth * i * imageMultiplier) + (j * imageMultiplier)] === 255) {
                    // white space aka alien
                    structure.push(1)
                } else {
                    // black space aka void
                    structure.push(0)
                }
            }
            this.lines.push(new Line(
                this.YPatternGenerator.next().value,
                this.alien_status_img,
                structure
            ))
        }
    }

    getAlienCount() {
        let alienSum = 0
        // sum the aliens in each line
        for (let line of this.lines) {
            alienSum += line.getAlienCount()
        }
        return alienSum
    }

    move() {
        for (let line of this.lines) {
            line.move()
        }
    }

    checkHit(bulletPos) {
        for (let line of this.lines) {
            if (line.checkHit(bulletPos)) {
                return true
            }
        }
        return false
    }

    draw() {
        for (let line of this.lines) {
            line.draw()
        }
    }
}