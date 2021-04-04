import { call, take, fork, cancel } from "redux-saga/effects";
import {
  DriverSocketFlow,
  Connect_To_Socket,
  disconnect,
  Read_Emit_Or_Write_Emit,
  socketbug,
} from "./drivers.saga";
// import { createMockTask } from "@redux-saga/testing-utils";
import io from "socket.io-client";
import MockedSocket from "socket.io-mock";

import DriversActionTypes from "./drivers.types";

//Uses Jest
jest.mock("socket.io-client");

describe("DriverSocketFlow generator function\n", () => {
  let socket;
  beforeEach(() => {
    socket = new MockedSocket();
    io.mockReturnValue(socket);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const mockGeneratorPayload = { payload: { name: "Royal Palms" } };
  const generator = DriverSocketFlow(mockGeneratorPayload);

  test("1. Connected to the socket successfully", () => {
    expect(generator.next(socket).value).toEqual(
      call(Connect_To_Socket, mockGeneratorPayload.payload.name)
    );
    expect(generator.next(socket).value).toEqual(
      call(socketbug, mockGeneratorPayload.payload.name)
    );
  });
  test("2. Read_Emit_Or_Write_Emit generator function operations for socket.on and emit", () => {
    expect(generator.next(socket).value.payload.fn).toEqual(
      fork(Read_Emit_Or_Write_Emit, socket).payload.fn
    );
  });

  test("3. Disconnected gracefully", () => {
    expect(generator.next().value).toEqual(
      take(DriversActionTypes.DRIVERS_SOCKET_OFF)
    );
    expect(generator.next(socket).value.payload.fn).toEqual(
      call(disconnect, socket).payload.fn
    );
    expect(generator.next(socket).value.payload.fn).toEqual(
      call(disconnect, socket).payload.fn
    );

    expect(generator.next().value).toEqual(cancel());
  });
});
