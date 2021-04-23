// import SocketActionTypes from "./socket.types";
import driverReducer from "./drivers.reducer";
// import StoresActionTypes from "../stores/stores.types";
//https://www.youtube.com/watch?v=UOGxfvNwv-8

describe("driver reducer", () => {
  const defaultState = {
    ActiveMovingDriver: [],
    currentDrivers: [],
    justadded: undefined,
    disconnectedDriver: undefined,
    disconnectTrigger: false,
    position: {},
    show_drivers_or_stores_panel: false,
  };
  it("should return default state", () => {
    const newState = driverReducer(undefined, {});
    expect(newState).toEqual(defaultState);
  });
  //JUst a template to refer to
  //   it("Reducer received SOCKET_ON type should return new state", () => {
  //     const newState = socketReducer(undefined, {
  //       type: StoresActionTypes.SOCKET_ON,
  //       payload: {},
  //     });
  //     const expectedState = {
  //       ...defaultState,
  //     };

  //     // //we mimick the returned object from the reducer by calling the functions from utlis
  //     expect(newState).toEqual(expectedState);
  //   });

  //   it("Reducer received SOCKET_OFF should serve as a listner to turn off order and driver socket", () => {
  //     const newState = socketReducer(undefined, {
  //       type: SocketActionTypes.SOCKET_OFF,
  //     });

  //     const expectedState = {
  //       ...defaultState,
  //     };
  //     expect(newState).toEqual(expectedState);
  //   });
});
