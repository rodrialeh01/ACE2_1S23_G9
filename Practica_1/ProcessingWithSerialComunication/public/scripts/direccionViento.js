const socket = io();

let puntos = [];
let datos = []
let labels = []

let ancho_c = 1300;
let alto_c = 15000;
let margen = {derecha: 20, izquierda: 110, superior: 10, inferior: 40};
let ancho_g = ancho_c - margen.derecha - margen.izquierda;
let alto_g = alto_c - margen.superior - margen.inferior;
let anchobanda;
let contador_norte, contador_sur, contador_este, contador_oeste, contador_fechas = 0;
let fecha_actual;
let dia = 0;

socket.on('data', (data) => {
    //console.log("hola"+data);
});

async function getResponse() {
	const response = await fetch(
		`http://localhost:3000/data/D`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
			}
		}
	);
	const data = await response.json(); // Extracting data as a JSON Object from the response

    let datosTemp = data.map((item) => { return int(item.dato); });
    let tiempoTemp = data.map((item) => { return new Date(item.fecha).getDate()+"/" + (new Date(item.fecha).getMonth()+1) + "/" + new Date(item.fecha).getFullYear()+ " "+ new Date(item.fecha).getHours() + ":" + new Date(item.fecha).getMinutes() + ":" + new Date(item.fecha).getSeconds(); });
	let dia2 = int(data.map((item) => {return new Date(item.fecha).getDate()}))
	if(dia != dia2){
        dia = dia2;
        contador_fechas++;
    }
    /* RECORDATORIO PERSONAL XD (Si alguien lee esto que no sea el que haya hecho el commit ignorelo sino pues equis xd) 
    * 1. PLAN: Obtener cada fecha y guardarla en un arteglo, para luego verificar cuantas fechas hay que mostrar en el texto 
    * 2. PARTE 2: Contar cuantas veces se repite cada punto cardinal por dia
    * 3. Si me sale gud hago de lo de la grafica de barras o tal vez no, mejor pregunto en el grupo para asegurar
    * 4. Si no sale entonces mejor solo copio y pego la grafica de barras de las anteriores y que ahi se quede la grafica o solo dejar el intento de la radial, igual pregunto en el grupo
    */
    datos= datosTemp;
	labels = tiempoTemp;
	console.log(datos);
	console.log(labels);
	createCanvas(windowWidth, 15000);
	background(233,157,15);	
	push();
	translate(margen.izquierda, margen.derecha);
	//ejex(datos);
	grafico(datos);
	//ejey(labels);
	pop();
}


function setup() {
	getResponse();
}

function barra(y, largo){
	let padding = 5;
	noStroke();
	fill(0);
	rect(0,y, largo,anchobanda-padding);
}

function grafico(datos){
	anchobanda = alto_g / datos.length;
	/*for(let i = 0; i < datos.length; i++){
		let mapeo = map(datos[i], 0, max(datos), 0, ancho_g);
		barra(anchobanda * i, mapeo);
	}*/
    for(let i = 0; i < 4; i++){
        circulos(i,i);
    }
}

function ejey(labels){
	fill(0);
	stroke(1);
	textSize(10);
	textAlign(RIGHT);
	fill(0);
	for(let i = 0; i< labels.length; i++){
		text(labels[i], -25, (anchobanda * i)+(anchobanda/2));
	}
}

function circulos(x,y){
    noStroke();
    fill(0);
    ellipse(500,50+(y*100),100,100);
    ellipse(500,1000-(y*100),100,100);
    ellipse(25+(x*100),500,100,100);
    ellipse(1000-(x*100),500,100,100);
    fill(255);
    textSize(20);
    text("Norte", 475, 50+(y*100));
    text("Sur", 485, 1005-(y*100));
    text("Oeste", 0+(x*100), 500);
    text("Este", 975-(x*100), 500);
}

function ejex(datos){
	stroke(1);
	let ticks = 10;
	let distancia_ticks = int(max(datos) / ticks);
	for(let i = 0; i < max(datos); i+=distancia_ticks){
		let mapeo = map(i,0,max(datos),0,ancho_g);
		line(mapeo, 0, mapeo, alto_g);
		textAlign(CENTER);
		text(i + "g/m3", mapeo, alto_g+20);
	}
}

function draw() {
    for(let i = 0; i < 4; i++){
        lineas(i,i);
    }
}
function lineas(x,y){
    line(575, 75+(y*100), 100+(x*100), 500);
    line(90+(x*100), 500, 575, 1000-(y*100));
    line(650, 1000-(y*100), 1150-(x*100), 500);
    line(1150-(x*100), 500, 605, 30+(y*100));
}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	background(233,157,15);
  }