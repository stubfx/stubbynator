class Food {
  
  constructor(x,y, color, edible, foodImg){
    this.x = x
    this.y = y
    this.color = color
    // true as default
    this.isEdible = edible !== undefined ? edible : false
    this.foodImg = foodImg
  }
  
  setEaten() {
    this.isEdible = false
  }
  
  getPosition() {
    return createVector(this.x, this.y)
  }
  
  draw(){
    if (!this.isEdible) return;
    if (!this.foodImg) {
      stroke(this.color); // Change the color
      strokeWeight(10); // Make the points 10 pixels in size
      point(this.x, this.y);
    } else {
      image(this.foodImg, this.x - 10, this.y - 10, 20, 20)
    }
  }
  
}