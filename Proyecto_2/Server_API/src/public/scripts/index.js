const socket = io()

socket.on('values', (data) => {
    console.log(data);
})