import { initScreen } from './screen.js';

const socket = io();

socket.on("join", (data) => {
  console.log(`user joined: ${data.userSessionId}`);
});
socket.on("leave", (data) => {
  console.log(`user leaved: ${data.userSessionId}`);
});

window.addEventListener('beforeunload', () => {
  socket.disconnect();
});

initScreen();
