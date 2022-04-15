import { Socket } from 'socket.io';

export const play = (socket: Socket, data: any) => console.log('play', data);
export const pause = (socket: Socket, data: any) => console.log('pause', data);
export const sync = (socket: Socket, data: any) => console.log('sync', data);
