const socket = io();

let puntos = [];
let datos = []
let labels = []

let ancho_c = 1300;
let alto_c = 60000;
let margen = {derecha: 20, izquierda: 110, superior: 10, inferior: 40};
let ancho_g = ancho_c - margen.derecha - margen.izquierda;
let alto_g = alto_c - margen.superior - margen.inferior;
let anchobanda;

socket.on('data', (data) => {
    //console.log("hola"+data);
});

async function getResponse() {
	const response = await fetch(
		`http://localhost:3000/data/HA`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
			}
		}
	);
	const data = await response.json(); // Extracting data as a JSON Object from the response

    let datosTemp = data.map((item) => { return Number(item.dato); });
    let tiempoTemp = data.map((item) => { return new Date(item.fecha).getDate()+"/" + (new Date(item.fecha).getMonth()+1) + "/" + new Date(item.fecha).getFullYear()+ " "+ new Date(item.fecha).getHours() + ":" + new Date(item.fecha).getMinutes() + ":" + new Date(item.fecha).getSeconds(); });
	datos= datosTemp;
	for(let i = 0; i < datos.length; i++){
		datos[i] = datos[i] * 100;
	}
	labels = tiempoTemp;
	console.log(datos);
	console.log(labels);
	createCanvas(windowWidth, 60000);
	background(198,222,226);
	push();
	translate(margen.izquierda, margen.derecha);
	ejex(datos);
	grafico(datos);
	ejey(labels);
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
	for(let i = 0; i < datos.length; i++){
		let mapeo = map(datos[i], 0, max(datos), 0, ancho_g);
		barra(anchobanda * i, mapeo);
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
}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	background(233,157,15);
  }