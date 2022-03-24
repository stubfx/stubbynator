class Target {

    constructor(targetName) {
        if (typeof targetName === "undefined") {
            console.error("missing target name")
            return
        }
        this.name = targetName;
        this.valid = true;
    }

    moveTo() {
        if (!this.valid) return
        this.valid = false
    }

    checkHit(bulletPos) {
        if (!this.valid) return
        this.valid = false
    }

    hit(bulletPos) {
        if (!this.valid) return
        this.valid = false
    }

    draw() {
        if (!this.valid) return
        this.valid = false
    }
}