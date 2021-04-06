import SocketActionTypes from "./socket.types";
import socketReducer from "./socket.reducer";

//https://www.youtube.com/watch?v=UOGxfvNwv-8
describe("socketReducer", () => {
  const defaultState = {
    socket: {},
    socketToggle: false,
    socketStoreName: "",
  };
  it("should return default state", () => {
    const newState = socketReducer(undefined, {});
    expect(newState).toEqual(defaultState);
  });

  it("should return new state if receiving type SET_SOCKET_STORE_NAME", () => {
    const mockStorePayload = "psq-1";
    // we pass a payload to the reducer and expect a new state
    const newState = socketReducer(undefined, {
      type: SocketActionTypes.SET_SOCKET_STORE_NAME,
      payload: mockStorePayload,
    });
    const expectedState = {
      ...defaultState,
      socketToggle: true,
      socketStoreName: "psq-1",
    };
    // //we mimick the returned object from the reducer by calling the functions from utlis
    expect(newState).toEqual(expectedState);
  });
  it("should return new state if receiving type INITALIZE_SOCKET", () => {
    const mockSocket = {};
    // we pass a payload to the reducer and expect a new state
    const newState = socketReducer(undefined, {
      type: SocketActionTypes.INITALIZE_SOCKET,
      payload: mockSocket,
    });

    const expectedState = {
      ...defaultState,
    };
    expect(newState).toEqual(expectedState);
  });
  it("should return new state if receiving type TOGGLE_SOCKET_OFF", () => {
    const mocksocketToggleOff = false;
    // we pass a payload to the reducer and expect a new state
    const newState = socketReducer(undefined, {
      type: SocketActionTypes.TOGGLE_SOCKET_OFF,
      payload: mocksocketToggleOff,
    });

    const expectedState = {
      ...defaultState,
    };
    expect(newState).toEqual(expectedState);
  });
});
