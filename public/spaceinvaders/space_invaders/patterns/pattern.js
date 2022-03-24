class Pattern {

    constructor(patternName) {
        if (typeof patternName === "undefined") {
            console.error("missing pattern name")
            return
        }
        this.name = patternName;
        this.valid = true;
    }

    getAlienCount(){
        if (!this.valid) return 0
        this.valid = false
        console.error("missing getAlienCount(): int implementation in: " + this.name)
    }

    move() {
        if (!this.valid) return
        this.valid = false
        console.error("missing move(): void implementation in: " + this.name)
    }

    checkHit(bulletPos) {
        if (!this.valid) return
        this.valid = false
        console.error("missing checkHit(bulletPos: p5.vector): void implementation in: " + this.name)
    }

    draw() {
        if (!this.valid) return
        this.valid = false
        console.error("missing draw(): void implementation in: " + this.name)
    }
}