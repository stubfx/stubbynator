class FoodManager {

    constructor(width, height, color, foodImg) {
        this.width = width
        this.height = height
        this.foodPieces = []
        this.maxDistanceToEat = 10
        this.startingFood = 5
        this.color = color
        this.maxFoodPieces = 15 // maximum food pieces together
        this.foodImg = foodImg
        this.createRandomFood()
    }

    createRandomFood() {
        for (let i = 0; i < this.startingFood; i++) {
            this.addFoodPiece()
        }
    }

    addFoodPiece() {
        // add a food piece if we didn't reach the maximum food pieces for each FoodManager.
        if (this.foodPieces.length < this.maxFoodPieces) {
            this.foodPieces.push(new Food(
                Math.floor(Math.random() * this.width),
                Math.floor(Math.random() * this.height),
                this.color, true, this.foodImg));
        }
    }

    addFoodPieceAt(x, y) {
        // check boundaries.
        if (x < 0 || x > this.width) {
            return
        }
        if (y < 0 || y > this.height) {
            return
        }
        // add a food piece if we didn't reach the maximum food pieces for each FoodManager.
        if (this.foodPieces.length < this.maxFoodPieces) {
            this.foodPieces.push(new Food(
                Math.floor(x), Math.floor(y),
                this.color, true, this.foodImg));
        }
    }

    eatAtThis(eaterPosition) {
        for (let i = 0; i < (this.foodPieces.length); i++) {
            let food = this.foodPieces[i]
            let foodPos = food.getPosition()
            let dist = p5.Vector.dist(eaterPosition, foodPos)
            if (dist < this.maxDistanceToEat) {
                this.foodPieces.splice(i, 1)
                // uncomment this if u want another piece of food to be created
                // after one has been eaten.
                //this.addFoodPiece()
                return true
            }
        }
        return false
    }

    getNearestFood(snakeX, snakeY) {
        if (this.foodPieces.length === 0) {
            // in this case there is no food left
            return undefined
        }
        let closest = undefined
        let closestDistance = undefined
        let snakePos = createVector(snakeX, snakeY)
        for (let i = 0; i < (this.foodPieces.length); i++) {
            let fp = this.foodPieces[i]
            let fpV = createVector(fp.x, fp.y)
            if (closest === undefined) {
                closest = fp
                closestDistance = snakePos.dist(fpV)
            } else {
                let dist = snakePos.dist(fpV)
                if (dist < closestDistance) {
                    closest = fp
                    closestDistance = dist
                }
            }
        }
        return closest
        //return createVector(mouseX, mouseY)
    }

    draw() {
        for (const food of this.foodPieces) {
                food.draw()
        }
        // for (let i = 0; i < (this.foodPieces.length); i++) {
        //     this.foodPieces[i].draw();
        // }
    }

}