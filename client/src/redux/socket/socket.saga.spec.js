import { call, put, takeLatest, all, select } from "redux-saga/effects";
import {
  setSocket,
  onSetSocket,
  socketSagas,
  getUserOnClickStore,
} from "./socket.saga";
import { socketOn } from "./socket.action";
import { Connect_To_Socket_With_StoreId } from "./socket.utils";

import StoresActionTypes from "../stores/stores.types";

describe("function to get picked store state", () => {
  it("should of been called", () => {
    getUserOnClickStore({ stores: { connectedStore: "psq1" } });
  });
});

describe("Socket generator function\n", () => {
  const generator = setSocket();
  it("setSocket select(getUserOnClickStore) when manager clicks on a store.\nPull chosen store from store reducer, and use it for the socket connection", () => {
    expect(generator.next().value).toEqual(select(getUserOnClickStore));
  });
  it("setSocket Connect_To_Socket_With_StoreId function should pass in store name psq1 to get socket Object", () => {
    expect(
      generator.next({
        storeId: "psq1",
      }).value
    ).toEqual(
      call(Connect_To_Socket_With_StoreId, {
        storeId: "psq1",
      })
    );
  });
  it("Should put the socket object in the socket reducer", () => {
    let MockSocketObject = {};
    expect(generator.next(MockSocketObject).value).toEqual(
      put(socketOn(MockSocketObject))
    );
  });
});

describe("onSetSocket Listener", () => {
  it("Listen to CONNECTED_STORE to start the socket", () => {
    const generator = onSetSocket();
    expect(generator.next().value).toEqual(
      takeLatest(StoresActionTypes.CONNECTED_STORE, setSocket)
    );
  });
});

describe("socketSagas root Socket saga", () => {
  it("should be test", () => {
    const generator = socketSagas();
    expect(generator.next().value).toEqual(all([call(onSetSocket)]));
  });
});
