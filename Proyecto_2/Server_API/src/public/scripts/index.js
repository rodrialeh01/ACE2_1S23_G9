
const socket = io()

socket.on('values', (data) => {
    console.log(data);
    // document.querySelector('h1').innerHTML = data[0].humedad
})