import { Socket } from 'socket.io';
import { io } from '../../setup/server';
import { SocketDraw } from './types';

const NAMESPACE_KEY = '/draw';

let state: SocketDraw[] = [];

export async function init() {
  console.log(`🔥 Initializing ${NAMESPACE_KEY} namespace...`);

  io.of(NAMESPACE_KEY).on('connection', async (socket: Socket) => {
    // TODO: get connected clients from namespace only, after redisadapter implemented
    const sockets = Object.keys(io.engine.clients);

    socket.emit('state', {
      state,
      users: sockets,
    });
    socket.on('mouse', (data) => {
      state.push(data);
      socket.broadcast.emit('mouse', data);
    });
    socket.on('disconnect', () => console.log('Client has disconnected'));
    socket.on('change-color', (color) => {
      socket.broadcast.emit('color', { id: socket.id, color });
    });
  });
}
