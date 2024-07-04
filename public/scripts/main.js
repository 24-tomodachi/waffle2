import { initScreen } from './screen.js';
import { addPlayer, removePlayer } from './screen.js';

await initScreen();

const socket = io();
addPlayer(socket.id);

socket.on("join", (data) => {
  console.log(`user joined: ${data.userSessionId}`);
  addPlayer(data.userSessionId);
});
socket.on("leave", (data) => {
  console.log(`user leaved: ${data.userSessionId}`);
  removePlayer(data.userSessionId);
});

window.addEventListener('beforeunload', () => {
  socket.disconnect();
});

