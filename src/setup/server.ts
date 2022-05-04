import { Socket } from 'socket.io';

const express = require('express');
const app = express();
const http = require('http');

const { Server: SocketIOServer } = require('socket.io');

export const httpServer = http.createServer(app);
export const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*',
  },
});

app.use(express.static('public'));

io.on('connection', (socket: Socket) => {
  socket.emit('message', socket.id + ' connected on global');
  socket.on('disconnect', () => console.log('user disconnected'));
});

io.use((socket: Socket, next: any) => {
  console.log('global-middleware');
  next();
});
