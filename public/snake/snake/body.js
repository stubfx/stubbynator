class Body {
  
  constructor(x,y, bodyImg){
    this.x = x
    this.y = y
    this.bodyImg = bodyImg
    this.dim = 22
  }
  
  moveTo(coordinates) {
    this.x = coordinates.x
    this.y = coordinates.y
  }
  
  getPosition(){
    return createVector(this.x, this.y)
  }
  
  draw(){
    // stroke('blue')
    // strokeWeight(15); // Make the points 10 pixels in size
    // point(this.x, this.y);
    image(this.bodyImg, this.x - this.dim/2, this.y - this.dim/2, this.dim, this.dim)
  }
  
}