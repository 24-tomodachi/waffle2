import { initScreen } from './screen.js';

const socket = io();

window.addEventListener('beforeunload', () => {
  socket.disconnect();
});

initScreen();
