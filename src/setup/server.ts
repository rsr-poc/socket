import { Socket } from 'socket.io';

const express = require('express');
const app = express();
const http = require('http');

const { instrument } = require('@socket.io/admin-ui');
const { Server: SocketIOServer } = require('socket.io');

export const httpServer = http.createServer(app);
export const io = new SocketIOServer(httpServer, {
  cors: {
    origin: [
      'http://localhost:8080',
      'http://localhost:5000',
      'https://admin.socket.io',
    ],
    methods: '*',
    credentials: true,
  },
});

instrument(io, {
  auth: false,
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
