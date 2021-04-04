import DriversActionTypes from "./drivers.types";

/**
 * @param {boolean} socketstatus
 * ToggleDriverSocket takes in boolean true or false
 * to activate or disable driversocket
 */

export const ClearActiveDriver = () => ({
  type: DriversActionTypes.CLEAR_ACTIVE_DRIVER,
});

export const AddActiveDriver = (driver) => ({
  type: DriversActionTypes.ADD_ACTIVE_DRIVER,
  payload: driver,
});

export const RemoveActiveDriver = (driver) => ({
  type: DriversActionTypes.REMOVE_ACTIVE_DRIVER,
  payload: driver,
});

export const SetActiveDriverPosition = (position) => ({
  type: DriversActionTypes.SET_ACTIVE_DRIVER_POSITION,
  payload: position,
});

/*
***Initalizes *** 
Socket boolean in reducer to true or false
Passes data to DriverSocketFlow_Store_Init
*/
export const DriverSocketFlow_Store_Init = (Store) => ({
  type: DriversActionTypes.DRIVERS_SOCKET_ON,
  payload: Store,
});
