import {
  all,
  take,
  call,
  takeLatest,
  cancel,
  select,
  fork,
  put,
} from "redux-saga/effects";
/* https://redux-saga.js.org/ */

import SocketActionTypes from "../socket/socket.types";
import { disconnect, socketDriverOn } from "./drivers.utlis";

/* We can listen to any action within the array
for now we want to listen to when the socket starts */
export function* driversSagas() {
  yield all([call(listenToSocket)]);
}

/* We listen to when the manager clicks a on a store and starts the generator function
driverSocketFlow */
export function* listenToSocket() {
  yield takeLatest(SocketActionTypes.SOCKET_ON, driverSocketFlow);
}

/*First We need to retrieve data from the socket reducer*/
export const getSocket = (state) => state.socket.socket; //socket is an Object

/* driverSocketFlow deals with driver socket operations */
export function* driverSocketFlow() {
  /* We can pull state from other reducers using redux saga library select method */

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

export function* read_Emit_Or_Write_Emit(socket) {
  //Read from the socket
  yield fork(read, socket);

  /*we can add a write emit here if for instance the 
  manager wants to give a speific message
  to a driver*/
}

export function* read(socket) {
  /*You can check all the socket.on in driver.utlis.js.
  Check the -> socketDriverOn function
  which needs the socket object*/
  const channel = yield call(socketDriverOn, socket);

  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}
