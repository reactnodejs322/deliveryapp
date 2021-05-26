import { all, call, put, takeLatest, select } from "redux-saga/effects";
import StoresActionTypes from "../stores/stores.types";
import { socketOn } from "./socket.action";
import { Connect_To_Socket_With_StoreId } from "./socket.utils";

//when the user clicks on a store
export const getUserOnClickStore = (state) => state.stores.connectedStore;

export function* setSocket() {
  const connectedStore = yield select(getUserOnClickStore);
  try {
    const socket = yield call(Connect_To_Socket_With_StoreId, {
      storeId: connectedStore.storeId,
    });
    yield put(socketOn(socket));
  } catch (error) {
    console.log(error);
  }
}

export function* onSetSocket() {
  yield takeLatest(StoresActionTypes.CONNECTED_STORE, setSocket);
}

export function* socketSagas() {
  yield all([call(onSetSocket)]);
}
