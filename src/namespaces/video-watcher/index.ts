import { Socket } from 'socket.io';
import { io } from '../../setup/server';
import * as VideoEvents from './events';

export function init() {
  io.of('/video').on('connection', (socket: Socket) => {
    socket.emit('message', socket.id + ' connected on video-watcher namespace');
    socket.on('play', VideoEvents.play);
    socket.on('pause', VideoEvents.pause);
    socket.on('sync', VideoEvents.sync);
  });

  io.of('/video').use((socket: Socket, next: any) => {
    console.log('video-middleware', socket.id);
    next();
  });
}
