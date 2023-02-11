const display = document.querySelector('#display');

const socket = io();

let txtPrueba = ""
let temp = "";

let temperatura="";
let humedadR="";
let humedadA="";
let presion="";
let direccion="";
let velocidad="";

let dataTemp = {
  sensor: "",
  dato: ""
}

const enviarDatos = (datitosOk) => {
  fetch(`http://localhost:3000/datas`, {        
          method: 'POST',
          body: JSON.stringify(datitosOk),
          headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          }
      })
          .then(res => res.json())
          .catch(error => console.error('Error:', error));
   }

let arrData = [];

socket.on('data', (data) => {
  //  console.log("hola"+data);
    // display.innerHTML = data;
    txtPrueba = data;
    temp = txtPrueba.split("/");
    if(temp[0] == "T"){
        temperatura = temp[1];
        dataTemp.sensor = "T";
        dataTemp.dato = temp[1];
        arrData.push(dataTemp);
    }
    if(temp[0] == "HR"){
        humedadR = temp[1];
        dataTemp.sensor = "HR";
        dataTemp.dato = temp[1];
        arrData.push(dataTemp);
    }
    if(temp[0] == "HA"){
      humedadA = temp[1];
      dataTemp.sensor = "HA";
      dataTemp.dato = temp[1];
      arrData.push(dataTemp);
    }
    if(temp[0] == "D"){
      direccion = temp[1];
      dataTemp.sensor = "D";
      dataTemp.dato = temp[1];
      arrData.push(dataTemp);
      if(direccion == "n\r"){
        direccion = "Norte";
      }
      else if(direccion == "s\r"){
        direccion = "Sur";
      }
      else if(direccion == "e\r"){
        direccion = "Este";
      }
      else if(direccion == "o\r"){
        direccion = "Oeste";
      }
      else{
        direccion = temp[1];
      }
    }
    if(temp[0] == "P"){
      presion = temp[1];
      dataTemp.sensor = "P";
      dataTemp.dato = temp[1];
      arrData.push(dataTemp);
    }
    if(temp[0] == "V"){
      velocidad = temp[1];
      dataTemp.sensor = "V";
      dataTemp.dato = temp[1];
      arrData.push(dataTemp);
      console.log(arrData);
      enviarDatos(arrData);
    }
    
    console.log(temperatura);
});

// ACA EMPIEZA EL CODIGO DE P5.JS TUYO RAIDRI

let img, img2, img3, img4;
let button;
function setup() {
    // put setup code here
    createCanvas(windowWidth,windowHeight);
    background(0,204,204);
    img = createImg('../images/3534501.png','temperature');
    img2 = createImg('../images/humedad.png','humedad');
    img3 = createImg('../images/aire.png','aire');
    img4 = createImg('../images/presion.png','presion');
}

function draw() {
  // TITULO PRINCIPAL
  textSize(30);
  textAlign(LEFT);
  fill(255,255,255);
  text("Estación Meteorológica IOT - Grupo 9",50,50)

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
  textSize(35);
  fill(255,255,255);
  //text(txtPrueba,250,220);
  text(temperatura+"ºC",250,220);
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
  textSize(35);
  fill(255,255,255);
  text(humedadR+" ºC",710,220);

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
  textSize(35);
  fill(255,255,255);
  text(humedadA+"g/m",1110,220);
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
  textSize(35);
  fill(255,255,255);
  text(velocidad+"km/h",250,420);

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
  textSize(35);
  fill(255,255,255);
  text(direccion,700,420);

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
  textSize(35);
  fill(255,255,255);
  text(presion+"mmHg",1110,420);
  textSize(20);
  text("3",1250,190);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0,204,204);
}