const socket = io();

let txtPrueba = ""

socket.on('data', (data) => {
    console.log("hola"+data);
});