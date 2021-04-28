//External libraries
import {
  takeLatest,
  put,
  all,
  call,
  select,
  fork,
  take,
  cancel,
  // race,
} from "redux-saga/effects";
//Listener
import SocketActionTypes from "../socket/socket.types";
import DriversActionTypes from "../drivers/drivers.types";
//Functions
import { socketOrderOn, disconnect, fetchOrders } from "./orders.utils";
//Actions
import {
  setupCurrentDragDrop,
  deltaDriverDragAndDrop,
  removeDriverDragDrop,
} from "./orders.action";

export function* read_Emit_Or_Write_Emit(socket) {
  yield fork(read, socket);
  // yield fork(write, socket);
}

export function* read(socket) {
  const channel = yield call(socketOrderOn, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

// const driversWithOrdersOnly = ({ payload }) => {
//   return payload.filter((driver) => driver.orders.length > 0);
// };

// function* write(socket) {
//   while (true) {
//     // https://hackernoon.com/modelling-common-patterns-with-redux-saga-464a380a37ce
//     // https://medium.com/autodesk-tlv/keep-calm-and-race-on-redux-saga-case-study-1a16d4d7b234
//     // Race Effect Listens to multiple actions
//     // actions and whatever gets called does something
//     const { sendOrderBundle, updateOrder } = yield race({
//       updateOrder: take("SOCKET_ORDER_SEND_UPDATE"),
//       sendOrderBundle: take("SOCKET_ORDER_BUNDLES"),
//     });
//     if (updateOrder) {
//       socket.emit("update-order", updateOrder.payload);
//     }
//     if (sendOrderBundle) {
//       socket.emit("order-bundles", driversWithOrdersOnly(sendOrderBundle));
//     }
//   }
// }

/*First We need to retrieve data from the socket reducer*/
export const getSocket = (state) => state.socket.socket; //socket is an Object

export function* orderSocketFlow() {
  const socket = yield select(getSocket);
  /* Yield represents that we are waiting for an action to be called so
  this does not produce a infinite loop!*/
  while (true) {
    /* We start the flow of socket.on  or socket.emit  using  
    read_Emit_Or_Write_Emit function which requires the socket Object*/
    const emitAction = yield fork(read_Emit_Or_Write_Emit, socket);

    /* The loop stops here when we listen to when the manager
    is pressing the disconnect button aka listening to socket disconnect action*/
    yield take(SocketActionTypes.SOCKET_OFF);

    /*afterwards we prepare to shutdown the socket gracefully*/
    yield call(disconnect, socket);

    // canceling the emitAction from the socket.on and pulling away from the while loop
    yield cancel(emitAction);
  }
}

//get storename
const getStoreNameFromReducer = (state) => state.stores.connectedStore.name; //socket is an Object

//setup Order drag and drop
export function* setupOrderDragDrop() {
  const orders = yield call(fetchOrders);

  const storename = yield select(getStoreNameFromReducer);

  yield put(
    setupCurrentDragDrop({
      orders: orders,
      storename: storename,
    })
  );
  yield call(orderSocketFlow);
}

// When a new Driver is added then we want to initalize the driver

//get drivers
const getDriverFromReducer = (state) => state.drivers.currentDrivers;

export function* initalizeDriverDragAndDrop() {
  const driver = yield select(getDriverFromReducer);
  const storename = yield select(getStoreNameFromReducer);
  yield put(deltaDriverDragAndDrop({ driver: driver, storename: storename }));
}

const getRemovedDriverFromReducer = (state) => state.drivers.disconnectedDriver;
export function* RemoveDriverDragAndDrop() {
  const RemoveDriver = yield select(getRemovedDriverFromReducer);

  // we want the latest drivers in the currentdragdrop object
  // we do not want it from the orders reducer because that would be old state
  // so we want the LATEST DATA currentdrivers from driver reducer
  const drivers = yield select(getDriverFromReducer);
  // console.log(RemoveDriver);
  yield put(
    removeDriverDragDrop({ currentdrivers: drivers, remove: RemoveDriver })
  );
}

//Start the order socket when a manager hits any store button
export function* listentoSocket() {
  yield takeLatest(SocketActionTypes.SOCKET_ON, setupOrderDragDrop);
}

// Listen to when a driver is connecting
export function* listentoAddActiveDriver() {
  yield takeLatest(
    DriversActionTypes.CURRENT_CONNECTED_DRIVER,
    initalizeDriverDragAndDrop
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
