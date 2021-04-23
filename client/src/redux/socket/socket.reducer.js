import SocketActionTypes from "./socket.types";
const INITIAL_STATE = {
  socket: {},
};

const socketReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SocketActionTypes.SOCKET_ON:
      return {
        ...state,
        socket: action.payload,
      };
    case SocketActionTypes.SOCKET_OFF:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default socketReducer;
