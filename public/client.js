var socket;

function connect() {
  socket = io();

  socket.on('connect', () => {
    console.log(socket.id);
  });

  socket.on('invite', (ip, port) => {
    console.log('invite!');
    document.body.innerHTML = `<p><b>${ip}:${port}</b></p>`;
    socket.disconnect();
  });
}

connect();

button.onclick = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    button.textContent = 'Play';
    msg.innerHTML = '&nbsp;';
  } else {
    connect();
    button.textContent = 'Cancel';
    msg.textContent = 'Searching...';
  }
};
