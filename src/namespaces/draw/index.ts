import { Socket } from 'socket.io';
import { io } from '../../setup/server';
import { SocketDraw, User } from './types';

const NAMESPACE_KEY = '/draw';

let state: SocketDraw[] = [];
let users: User[] = [];

export async function init() {
  console.log(`🔥 Initializing ${NAMESPACE_KEY} namespace...`);

  io.of(NAMESPACE_KEY).on('connection', async (socket: Socket) => {
    console.log('socket connected');

    users.push({ id: socket.id, color: '#0030f0' });

    io.of(NAMESPACE_KEY).emit('state', {
      state,
      users,
    });

    socket.on('mouse', (data) => {
      state.push(data);
      socket.broadcast.emit('mouse', data);
    });

    socket.on('disconnect', () => {
      console.log(socket.id, ' socket disconnected');
      users = users.filter((user) => user.id !== socket.id);
    });

    socket.on('change-color', (color) => {
      users = users.map((user) => {
        if (user.id === socket.id) {
          user.color = color;
        }
        return user;
      });

      io.of(NAMESPACE_KEY).emit('state', {
        state,
        users,
      });
    });

    socket.on('change-name', (name) => {
      users = users.map((user) => {
        if (user.id === socket.id) {
          user.name = name;
        }
        return user;
      });

      io.of(NAMESPACE_KEY).emit('state', {
        state,
        users,
      });
    });

    socket.on('clean', () => {
      state = [];

      io.of(NAMESPACE_KEY).emit('state', {
        state,
        users,
      });
    });
  });
}
