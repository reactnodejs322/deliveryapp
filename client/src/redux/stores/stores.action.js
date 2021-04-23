import StoresActionTypes from "./stores.types";

export const fetchApiStoreListUseEffect = () => ({
  type: StoresActionTypes.FETCH_API_STORE_LIST_USE_EFFECT,
});

export const putStoreInState = (store) => ({
  type: StoresActionTypes.PUT_STORES_IN_STATE,
  payload: store,
});

export const setConnectedStore = (store) => ({
  type: StoresActionTypes.CONNECTED_STORE,
  payload: store,
});
