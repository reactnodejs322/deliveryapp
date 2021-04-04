import StoresActionTypes from "./stores.types";

export const triggerStores = () => ({
  type: StoresActionTypes.TRIGGER_STORES,
});

export const PutStores = (store) => ({
  type: StoresActionTypes.PUT_STORES,
  payload: store,
});

export const setConnectedStore = (store) => ({
  type: StoresActionTypes.CONNECTED_STORE,
  payload: store,
});
