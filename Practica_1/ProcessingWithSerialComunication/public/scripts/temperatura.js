const socket = io();

let txtPrueba = ""

socket.on('data', (data) => {
    console.log("hola"+data);
});

const consulta = () => {
    fetch(`http://localhost:3000/data/T`, {
    method: 'GET',
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',}})
    .then(res => console.log(res.json()))
    .catch(err => {
        console.error('Error:', err)
        alert("Ocurrio un error, ver la consola")
    });
  };