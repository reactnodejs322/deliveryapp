import SocketActionTypes from "./socket.types";
export const SocketInitStore = (Store) => ({
  type: SocketActionTypes.SET_SOCKET_STORE_NAME,
  payload: Store,
});

export const Socket = (socket) => ({
  type: SocketActionTypes.INITALIZE_SOCKET,
  payload: socket,
});

export const SocketOff = (bool) => ({
  type: SocketActionTypes.TOGGLE_SOCKET_OFF,
  payload: bool,
});
