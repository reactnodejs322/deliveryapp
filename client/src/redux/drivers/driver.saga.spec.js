import { call, take, fork, cancel, select } from "redux-saga/effects";
import {
  driverSocketFlow,
  read_Emit_Or_Write_Emit,
  getSocket,
} from "./drivers.saga";
import { disconnect } from "./drivers.utlis";
import io from "socket.io-client";
import MockedSocket from "socket.io-mock";

import SocketActionTypes from "../socket/socket.types";

jest.mock("socket.io-client");

describe("driverSocketFlow generator function\n", () => {
  let socket;
  beforeEach(() => {
    socket = new MockedSocket();
    io.mockReturnValue(socket);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const mockGeneratorPayload = { payload: { name: "Royal Palms" } };
  const generator = driverSocketFlow(mockGeneratorPayload);

  test("1. Get the socket from the socket reducer", () => {
    expect(generator.next().value).toEqual(select(getSocket));
  });

  test("2. read_Emit_Or_Write_Emit generator function operations for socket.on and emit", () => {
    expect(generator.next(socket).value.payload.fn).toEqual(
      fork(read_Emit_Or_Write_Emit, socket).payload.fn
    );
  });

  test("3. Disconnected gracefully", () => {
    expect(generator.next().value).toEqual(
      take(SocketActionTypes.TOGGLE_SOCKET_OFF)
    );

    expect(generator.next(socket).value.payload.fn).toEqual(
      call(disconnect, socket).payload.fn
    );

    expect(generator.next().value).toEqual(cancel());
  });
});
