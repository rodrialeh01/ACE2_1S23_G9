const socket = io();

let puntos = [];

socket.on('data', (data) => {
    console.log("hola"+data);
});

async function getResponse() {
	const response = await fetch(
		`http://localhost:3000/data/T`,
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
    let tiempoTemp = data.map((item) => { return new Date(item.fecha).getSeconds(); });
    
}


function setup() {
    getResponse();
}
  
function draw() {
}