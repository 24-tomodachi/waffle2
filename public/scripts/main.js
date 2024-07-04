import { initScreen } from './screen.js';

const socket = io();
socket.emit("join", { roomId: "test", userId: "test" });

initScreen();
