import { all, call } from "redux-saga/effects";
import { driversSagas } from "./drivers/drivers.saga";
import { storeSagas } from "./stores/stores.saga";
import { socketSagas } from "./socket/socket.saga";
import { ordersSagas } from "./orders/orders.saga";
export default function* rootSaga() {
  //Similiar to compose all the sagas
  yield all([
    call(driversSagas),
    call(storeSagas),
    call(socketSagas),
    call(ordersSagas),
  ]);
}
