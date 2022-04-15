import { Socket } from 'socket.io';

const express = require('express');
const app = express();
const http = require('http');
export const server = http.createServer(app);
const { Server } = require('socket.io');
export const io = new Server(server);

app.get('/', (_req: any, res: any) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => console.log('user disconnected'));
});
