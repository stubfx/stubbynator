class Snake {

  constructor(startingX, startingY, foodManager, headImg) {
    this.pos = createVector(startingX, startingY);
    this.speed = 1;
    this.body = []
    this.fm = foodManager
    this.headCreated = false
    this.snakeGrowt = 2
    this.headImg = headImg
    this.maxGrowth = 3000 // should be 500 for more than 1 snake, just for performance issues
    this.createBody()
  }

  createBody() {
    for (let i = 0; i < 10; i++) {
      this.addBody()
    }
    // add the head to the body
    this.addHead()
  }

  addBody() {
    let l = this.body.length + this.snakeGrowt
    if (l > this.maxGrowth) return
    for (const x of Array(this.snakeGrowt))
      this.body.push(new Body(this.pos.x, this.pos.y,
        this.headImg))
  }

  addHead() {
    // should be called only once
    if (this.headCreated) {
      console.error('head already created')
      return
    }
    this.body.unshift(new Head(this.pos.x, this.pos.y,
      this.headImg))
  }

  move() {
    let food = this.fm.getNearestFood(this.pos.x, this.pos.y)
    if (food !== undefined) {
      let xMove = this.pos.x - food.x
      let yMove = this.pos.y - food.y
      // move the snake on the x first
      if (xMove > 0) {
        this.pos.sub(this.speed, 0)
      } else if (xMove < 0) {
        this.pos.add(this.speed, 0)
      }
      // move the snake y after that
      if (yMove > 0) {
        this.pos.sub(0, this.speed)
      } else if (yMove < 0) {
        this.pos.add(0, this.speed)
      }
      this.moveBodyToPos()
      this.checkEatFood()
    }
  }

  moveBodyToPos() {
    let newPos = this.pos;
    let lastPos;
    for (const part of this.body) {
      lastPos = part.getPosition()
      if (!newPos.equals(lastPos)) {
        part.moveTo(newPos.copy());
        newPos = lastPos.copy()
      }
    }
  }

  checkEatFood() {
    let headPos = createVector(this.pos.x, this.pos.y)
    if (this.fm.eatAtThis(headPos)) {
      this.addBody()
    }
  }

  draw() {
    for (const body of this.body) {
      body.draw()
    }
    this.body[0].draw()
  }


}