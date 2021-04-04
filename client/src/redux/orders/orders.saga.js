//External libraries
import { takeLatest, put, all, call, select } from "redux-saga/effects";
//Listener
import SocketActionTypes from "../socket/socket.types";
import DriversActionTypes from "../drivers/drivers.types";
//Functions
import { fetchOrders } from "./orders.utils";
//Actions
import {
  OrderApiSuccess,
  SetdragDropSuccess,
  InitDriverDragAndDrop,
  RemoveDriverDragDrop,
} from "./orders.action";

//StoreName
const GetStoreNameFromReducer = (state) => state.socket.socketStoreName.name; //socket is an Object
//get drivers
const GetDriverFromReducer = (state) => state.drivers.currentDrivers;
export function* callOrderApi() {
  const storename = yield select(GetStoreNameFromReducer);

  try {
    //Right Now it's not dynamic so we make api call to Royal Palms
    const orders = yield call(fetchOrders);
    //Bind orders and storename
    const ordersStoreName = {
      orders: orders,
      storename: storename,
    };
    //
    yield put(OrderApiSuccess(ordersStoreName));
    yield put(SetdragDropSuccess(ordersStoreName));
  } catch (error) {
    console.log("Request to orderApi Failed!");
  }
}

//We want to add all the driver to drag and drop
export function* InitalizeDriverDragAndDrop() {
  const driver = yield select(GetDriverFromReducer);
  const storename = yield select(GetStoreNameFromReducer);
  yield put(InitDriverDragAndDrop({ driver: driver, storename: storename }));
}
//get drivers
const GetRemovedDriverFromReducer = (state) => state.drivers.disconnectedDriver;
export function* RemoveDriverDragAndDrop() {
  const RemoveDriver = yield select(GetRemovedDriverFromReducer);
  const drivers = yield select(GetDriverFromReducer);
  yield put(
    RemoveDriverDragDrop({ currentdrivers: drivers, remove: RemoveDriver })
  );
}

//Start the order socket when a manager hits any store button
export function* listentoSocket() {
  yield takeLatest(SocketActionTypes.INITALIZE_SOCKET, callOrderApi);
}

// Listen to when a driver is connecting
export function* listentoAddActiveDriver() {
  yield takeLatest(
    DriversActionTypes.ADD_ACTIVE_DRIVER,
    InitalizeDriverDragAndDrop
  );
}
// Listen to when a driver is disconnecting
export function* listentoRemoveDriver() {
  yield takeLatest(
    DriversActionTypes.REMOVE_ACTIVE_DRIVER,
    RemoveDriverDragAndDrop
  );
}
//Begin with a listener here
export function* ordersSagas() {
  yield all([
    call(listentoSocket),
    call(listentoAddActiveDriver),
    call(listentoRemoveDriver),
  ]);
}
