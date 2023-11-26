var socket = io();

button.onclick = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    button.textContent = 'Play';
    msg.innerHTML = '&nbsp;';
  } else {
    socket = io();
    button.textContent = 'Cancel';
    msg.textContent = 'Searching...';
  }
};

socket.on('invite', (ip, port) => {
  document.body.innerHTML = `<p><b>${ip}:${port}</b></p>`;
  socket.disconnect();
});
