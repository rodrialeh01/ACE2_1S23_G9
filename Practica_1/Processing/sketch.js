let img, img2, img3, img4;
let button;
function setup() {
    // put setup code here
    createCanvas(windowWidth,windowHeight, P2D);
    background(0,204,204);
    img = createImg('./3534501.png','temperature');
    img2 = createImg('./humedad.png','humedad');
    img3 = createImg('./aire.png','aire');
    img4 = createImg('./presion.png','presion');
}

function draw() {
  // TITULO PRINCIPAL
  textSize(30);
  textAlign(LEFT);
  fill(255,255,255);
  text("Estación Meteorológica IOT - Grupo 9", 50, 50)

  //TEMPERATURA
  //-RECTANGULO
  fill('#063564');
  noStroke();
  rect(50, 90, 400, 180, 20);
  describe(
    'Rectángulo de información de la temperatura', 
  );

  //-IMAGEN
  
  image(img,50,100,150,150);
  
  //-TEXTO
  textSize(30);
  fill(255,255,255);
  text("Temperatura",220,150);
  textSize(50);
  fill(255,255,255);
  text("25ºC",250,220);

  //HUMEDAD RELATIVA
  //-RECTANGULO
  fill('#063564');
  noStroke();
  rect(500, 90, 400, 180, 20);
  describe(
    'Rectángulo de información de la humedad', 
  );

  //-IMAGEN
  
  image(img2,500,100,150,150);
  
  //-TEXTO
  textSize(30);
  fill(255,255,255);
  text("Humedad relativa",640,150);
  textSize(50);
  fill(255,255,255);
  text("25ºC",710,220);

  //HUMEDAD ABSOLUTA
  //-RECTANGULO
  fill('#063564');
  noStroke();
  rect(950, 90, 400, 180, 20);
  describe(
    'Rectángulo de información de la humedad', 
  );

  //-IMAGEN
  
  image(img2,950,100,150,150);
  
  //-TEXTO
  textSize(27);
  fill(255,255,255);
  text("Humedad Absoluta",1090,150);
  textSize(50);
  fill(255,255,255);
  text("25g/m",1110,220);
  textSize(20);
  text("3",1250,190);

  //VELOCIDAD DEL VIENTO
  //-RECTANGULO
  fill('#063564');
  noStroke();
  rect(50, 300, 400, 180, 20);
  describe(
    'Rectángulo de información de la velocidad del viento', 
  );

  //-IMAGEN
  
  image(img3,75,325,120,120);
  
  //-TEXTO
  textSize(25);
  fill(255,255,255);
  text("Velocidad del Viento",200,350);
  textSize(50);
  fill(255,255,255);
  text("25km/h",250,420);

  //DIRECCION DEL VIENTO
  //-RECTANGULO
  fill('#063564');
  noStroke();
  rect(500, 300, 400, 180, 20);
  describe(
    'Rectángulo de información de la humedad', 
  );

  //-IMAGEN
  
  image(img3,520,325,120,120);
  
  //-TEXTO
  textSize(25);
  fill(255,255,255);
  text("Dirección del Viento",650,350);
  textSize(50);
  fill(255,255,255);
  text("Sur",700,420);

  //PRESIÓN BAROMÉTRICA
  //-RECTANGULO
  fill('#063564');
  noStroke();
  rect(950, 300, 400, 180, 20);
  describe(
    'Rectángulo de información de la humedad', 
  );

  //-IMAGEN
  
  image(img4,975,335,100,100);
  
  //-TEXTO
  textSize(27);
  fill(255,255,255);
  text("Presión Barométrica",1090,350);
  textSize(50);
  fill(255,255,255);
  text("25mmHg",1110,420);
  textSize(20);
  text("3",1250,190);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0,204,204);
}