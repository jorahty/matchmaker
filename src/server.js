import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Queue from './queue.js';
import allocate from './allocate.js';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const players_per_match = 2;

const queue = new Queue();

io.on('connect', (socket) => {
  queue.push(socket);

  if (queue.length === players_per_match) {
    const sockets = queue.clear();

    handle(sockets);
  }

  socket.on('disconnect', () => {
    queue.remove(socket);
  });
});

async function handle(sockets) {
  const { ip, port } = await allocate();

  sockets.forEach((socket) => {
    socket.emit('invite', ip, port);
    console.log(`invite ${socket.id.slice(0, 3)}`);
    socket.disconnect();
  });
}

export const port = 4000;
server.listen(port, () => console.log(`Listening on *:${port}`));
