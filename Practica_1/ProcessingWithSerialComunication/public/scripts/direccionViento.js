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
let contador_norte=0, contador_sur=0, contador_este=0, contador_oeste = 0;
let fechas = [];
let contadores_dia = [];

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

    let datosTemp = data.map((item) => { return item.dato; });

    let tiempoTemp = data.map((item) => { return new Date(item.fecha).getDate()+"/" + (new Date(item.fecha).getMonth()+1) + "/" + new Date(item.fecha).getFullYear()+ " "+ new Date(item.fecha).getHours() + ":" + new Date(item.fecha).getMinutes() + ":" + new Date(item.fecha).getSeconds(); });
	let dia2 = int(data.map((item) => {return new Date(item.fecha).getDate()}))
	let dia3 = data.map((item) => {return new Date(item.fecha).getDate() + "/" + (new Date(item.fecha).getMonth()+1) + "/" + new Date(item.fecha).getFullYear()})
	for(let i = 0; i < dia2.length; i++){
		if(i<=dia2.length){
			if(dia2[i] != int(dia2[i+1])){
				contadores_dia.push({norte: contador_norte, sur: contador_sur, este: contador_este, oeste: contador_oeste, fecha: dia3[i]})
				contador_norte = 0;
				contador_sur = 0;
				contador_este = 0;
				contador_oeste = 0;
				console.log(datosTemp);
				if(datosTemp[i] == "Norte"){
					contador_norte++;
				}else if(datosTemp[i] == "Sur"){
					contador_sur++;
				}else if(datosTemp[i] == "Este"){
					contador_este++;
				}else if(datosTemp[i] == "Oeste"){
					contador_oeste++;
				}
			}else{
				if(datosTemp[i] == "Norte"){
					contador_norte++;
				}else if(datosTemp[i] == "Sur"){
					contador_sur++;
				}else if(datosTemp[i] == "Este"){
					contador_este++;
				}else if(datosTemp[i] == "Oeste"){
					contador_oeste++;
				}
			}
		}
	}
    datos= datosTemp;
	labels = tiempoTemp;
	console.log(contadores_dia);
	console.log(fechas);
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
    for(let i = 0; i < contadores_dia.length; i++){
        circulos(i,i,i);
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

function circulos(x,y,posicion){
    noStroke();
    fill(0);
    ellipse(500,50+(y*100),100,100);
    ellipse(500,1000-(y*100),100,100);
    ellipse(25+(x*100),500,100,100);
    ellipse(1000-(x*100),500,100,100);
    fill(255);
    textSize(20);
    text("Norte", 475, 50+(y*100));
	text(contadores_dia[posicion].fecha,550,50+(y*100));
	text(contadores_dia[posicion].norte,575,75+(y*100));
    text("Sur", 485, 1005-(y*100));
	text(contadores_dia[posicion].fecha,550,1005-(y*100));
	text(contadores_dia[posicion].sur,575,1030-(y*100));
    text("Oeste", 0+(x*100), 500);
	text(contadores_dia[posicion].fecha,0+(x*100), 575);
	text(contadores_dia[posicion].oeste,40+(x*100), 600);
    text("Este", 975-(x*100), 500);
	text(contadores_dia[posicion].fecha, 975-(x*100), 575);
	text(contadores_dia[posicion].este, 1015-(x*100), 600);
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
    for(let i = 0; i < contadores_dia.length; i++){
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