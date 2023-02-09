function setup() {
    // put setup code here
    createCanvas(windowWidth,windowHeight);
    background(0,204,204);
  }
  
  function draw() {
    // put drawing code here
    textSize(30);
    textAlign(LEFT);
    fill(255,255,255);
    text("Estación Meteorológica IOT - Grupo 9",50,50)
  }
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0,204,204);
  }