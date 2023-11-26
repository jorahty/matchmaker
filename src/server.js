import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import queue from './queue.js';
import allocate from './allocate.js';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

export const playersPerMatch = 5;

io.on('connect', (socket) => {
  queue.push(socket);

  checkQueue();

  socket.on('disconnect', () => {
    queue.remove(socket);
  });
});

async function checkQueue() {
  if (queue.length === playersPerMatch) {
    const { ip, port } = await allocate();

    for (const socket of queue.items) socket.emit('invite', ip, port);

    queue.clear();
  }
}

export const port = 4000;
server.listen(port, () => console.log(`Listening on *:${port}`));
