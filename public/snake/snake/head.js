class Head {
  
  constructor(x,y,headImg){
    this.x = x
    this.y = y
    this.isHead = true
    this.headImg = headImg
    this.dim = 50
  }
  
  moveTo(coordinates) {
    this.x = coordinates.x
    this.y = coordinates.y
  }
  
  getPosition(){
    return createVector(this.x, this.y)
  }
  
  draw(){
    // stroke(this.color); // Change the color
    // strokeWeight(20); // Make the points 10 pixels in size
    // point(this.x, this.y);
    image(this.headImg, this.x - this.dim/2, this.y - this.dim/2, this.dim, this.dim)
  }
  
}