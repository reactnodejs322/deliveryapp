import DriversActionTypes from "./drivers.types";

export const clearActiveDriver = () => ({
  type: DriversActionTypes.CLEAR_ACTIVE_DRIVER,
});

export const currentConnectedDriver = (driver) => ({
  type: DriversActionTypes.CURRENT_CONNECTED_DRIVER,
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

export const showDriverPanel = () => ({
  type: DriversActionTypes.SHOW_DRIVER_PANEL,
});

export const showStorePanel = () => ({
  type: DriversActionTypes.SHOW_STORE_PANEL,
});
