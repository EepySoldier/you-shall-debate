import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
console.log(SOCKET_SERVER_URL);

const serverUrl = SOCKET_SERVER_URL;

const socket: Socket = io(serverUrl, {
  autoConnect: false,
  reconnection: true,
});

export default socket;
