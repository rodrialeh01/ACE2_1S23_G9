import app from './app';
import { Server as WebsocketServer } from 'socket.io';
import http from 'http';
import { IPLOCAL } from './config';
import sockets from './sockets';

const server = http.createServer(app);
const httpServer = server.listen(4000, () => {
    console.log(`Server is running on ${IPLOCAL}:4000`);
});
const io = new WebsocketServer(server);
sockets(io);