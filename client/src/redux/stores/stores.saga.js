import { all, call, put, takeLatest } from "redux-saga/effects";
import StoresActionTypes from "./stores.types";
import axios from "axios";
import { putStoreInState } from "./stores.action";
const callApiStores = () => {
  var CancelToken = axios.CancelToken;
  var { token } = CancelToken.source();
  return axios
    .get("/api/stores", { cancelToken: token })
    .then((res) => res.data);
};

export function* SetStores() {
  try {
    const stores = yield call(callApiStores);

    yield put(putStoreInState(stores));
  } catch (error) {
    console.log("Request to storeApi Failed!");
  }
}

export function* onSetStores() {
  yield takeLatest(
    StoresActionTypes.FETCH_API_STORE_LIST_USE_EFFECT,
    SetStores
  );
}

export function* storeSagas() {
  yield all([call(onSetStores)]);
}
