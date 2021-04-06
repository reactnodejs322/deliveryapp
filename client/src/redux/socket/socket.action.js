import SocketActionTypes from "./socket.types";

//socketInitStore  called from store-item component
export const socketInitStore = (Store) => ({
  type: SocketActionTypes.SET_SOCKET_STORE_NAME,
  payload: Store,
});
//putSocketInReducer called from socket.saga
export const putSocketInReducer = (socket) => ({
  type: SocketActionTypes.INITALIZE_SOCKET,
  payload: socket,
});
// socketOff called from mapsidebar component
// TOGGLE_SOCKET_OFF listened by driver.saga
export const socketOff = (bool) => ({
  type: SocketActionTypes.TOGGLE_SOCKET_OFF,
  payload: bool,
});
