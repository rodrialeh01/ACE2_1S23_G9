'use strict'

require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { SerialPort, ReadlineParser } = require('serialport');
const socketio = require('socket.io');
const http = require('http');

const parser = new ReadlineParser();

const port = new SerialPort({
    path: 'COM6',
    baudRate: 9600,
    autoOpen: false
  })


const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(morgan('dev'));
app.use(cors());
const portNumber = process.env.PORT;

app.use(express.static(__dirname + '/public'));

server.listen(portNumber, () => {
    console.log("Servidor corriendo en el puerto", portNumber);
});
        

port.open(function (err) {
    if (err) {
        return console.log('Error opening port: ', err.message)
    }
    else
    {
        return console.log("Pueto abierto correctamente");
    }
})

port.pipe(parser);
    parser.on('data',(data) => {
    console.log(data);
    io.emit('data', data);
}); 