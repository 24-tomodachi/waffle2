import { initScreen } from './screen.js';
import { addPlayer, removePlayer, setPlayerFlag } from './screen.js';

await initScreen();

export const socket = io();
export const roomId = window.location.pathname.split("/")[2];

socket.on("connect", () => {
  console.log(`connected: ${socket.id}`);

  socket.emit("join", { roomId });
});
socket.on("join", (data) => {
  console.log(`user joined: ${data.socketId}`);
  addPlayer(data.socketId);
});
socket.on("initRoom", (data) => {
  const socketIds = data.socketIds;
  for(const socketId of socketIds) {
    addPlayer(socketId);
  }
});
socket.on("setFlag", (data) => {
  setPlayerFlag(data.socketId, data.flag, data.value);
});
socket.on("leave", (data) => {
  console.log(`user leaved: ${data.socketId}`);
  removePlayer(data.socketId);
});
socket.on("disconnecting", () => {
  socket.emit("leave", { socketId: socket.id, roomId });
});

window.addEventListener('beforeunload', () => {
  socket.disconnect();
});

