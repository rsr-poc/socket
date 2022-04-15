import { Socket } from 'socket.io';
import { io } from '../../setup/server';
import * as VideoEvents from './events';

export function init() {
  io.of('/video-watcher').on('connection', (socket: Socket) => {
    socket.on('play', VideoEvents.play);
    socket.on('pause', VideoEvents.pause);
    socket.on('sync', VideoEvents.sync);
  });
}
