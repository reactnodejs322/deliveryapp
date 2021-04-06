import DriversActionTypes from "./drivers.types";

export const clearActiveDriver = () => ({
  type: DriversActionTypes.CLEAR_ACTIVE_DRIVER,
});

export const addActiveDriver = (driver) => ({
  type: DriversActionTypes.ADD_ACTIVE_DRIVER,
  payload: driver,
});

export const removeActiveDriver = (driver) => ({
  type: DriversActionTypes.REMOVE_ACTIVE_DRIVER,
  payload: driver,
});

export const setActiveDriverPosition = (position) => ({
  type: DriversActionTypes.SET_ACTIVE_DRIVER_POSITION,
  payload: position,
});
