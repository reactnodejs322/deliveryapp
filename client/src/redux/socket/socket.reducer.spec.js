import SocketActionTypes from "./socket.types";
import socketReducer from "./socket.reducer";
import StoresActionTypes from "../stores/stores.types";
//https://www.youtube.com/watch?v=UOGxfvNwv-8

describe("socketReducer", () => {
  const defaultState = {
    socket: {},
  };
  it("should return default state", () => {
    const newState = socketReducer(undefined, {});
    expect(newState).toEqual(defaultState);
  });

  it("Reducer received SOCKET_ON type should return new state", () => {
    const newState = socketReducer(undefined, {
      type: StoresActionTypes.SOCKET_ON,
      payload: {},
    });
    const expectedState = {
      ...defaultState,
    };

    // //we mimick the returned object from the reducer by calling the functions from utlis
    expect(newState).toEqual(expectedState);
  });

  it("Reducer received SOCKET_OFF should serve as a listner to turn off order and driver socket", () => {
    const newState = socketReducer(undefined, {
      type: SocketActionTypes.SOCKET_OFF,
    });

    const expectedState = {
      ...defaultState,
    };
    expect(newState).toEqual(expectedState);
  });
});
