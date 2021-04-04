import SocketActionTypes from "./socket.types";
const INITIAL_STATE = {
  socket: {},
  socketToggle: false,
  socketStoreName: "",
};

const socketReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SocketActionTypes.SET_SOCKET_STORE_NAME:
      return {
        ...state,
        socketStoreName: action.payload,
        socketToggle: true,
      };
    case SocketActionTypes.INITALIZE_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    case SocketActionTypes.TOGGLE_SOCKET_OFF:
      return {
        ...state,
        socketToggle: false,
      };
    default:
      return state;
  }
};

export default socketReducer;
