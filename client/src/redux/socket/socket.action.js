import SocketActionTypes from "./socket.types";

//socketOn called from socket.saga
export const socketOn = (socket) => ({
  type: SocketActionTypes.SOCKET_ON,
  payload: socket,
});
// socketOff called from mapsidebar component
// SOCKET_OFF listened by driver.saga
export const socketOff = () => ({
  type: SocketActionTypes.SOCKET_OFF,
});
