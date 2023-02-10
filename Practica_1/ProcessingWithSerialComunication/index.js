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
    path: 'COM3',
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
app.use(express.static(__dirname + '/public/temperatura.html'));
app.use(express.static(__dirname + '/public/direccionViento.html'));
app.use(express.static(__dirname + '/public/velocidadViento.html'));
app.use(express.static(__dirname + '/public/humedadAbsoluta.html'));
app.use(express.static(__dirname + '/public/humedadRelativa.html'));
app.use(express.static(__dirname + '/public/presionBarometrica.html'));

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