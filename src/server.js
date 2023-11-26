import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import allocate from './allocate.js';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const players_per_match = 2;

const queue = [];

io.on('connect', (socket) => {
  queue.push(socket);
  render('push');

  if (queue.length === players_per_match) {
    const sockets = queue.splice(0, players_per_match);
    render('clear');

    handle(sockets);
  }

  socket.on('disconnect', () => {
    queue.splice(queue.indexOf(socket), 1);
    render('remove');
  });
});

async function handle(sockets) {
  const { ip, port } = await allocate();

  sockets.forEach((socket) => {
    socket.emit('invite', ip, port);
    console.log(`invite ${socket.id.slice(0, 3)}`);
  });
}

function render(msg) {
  console.log(`${msg} queue: [${queue.map((socket) => socket.id.slice(0, 3)).join()}]`);
}

export const port = 4000;
server.listen(port, () => console.log(`Listening on *:${port}`));
