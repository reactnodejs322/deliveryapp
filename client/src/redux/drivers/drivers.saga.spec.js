import {
  call,
  take,
  fork,
  cancel,
  select,
  put,
  takeLatest,
  all,
} from "redux-saga/effects";
import {
  driverSocketFlow,
  read_Emit_Or_Write_Emit,
  getSocket,
  read,
  listenToSocket,
  driversSagas,
} from "./drivers.saga";
import { disconnect, socketDriverOn } from "./drivers.utlis";
import io from "socket.io-client";
import MockedSocket from "socket.io-mock";
import { channel } from "redux-saga";
import SocketActionTypes from "../socket/socket.types";

jest.mock("socket.io-client");

describe("Driver saga root should be there ;/", () => {
  it("should be test", () => {
    const generator = driversSagas();
    expect(generator.next().value).toEqual(all([call(listenToSocket)]));
  });
});

describe("Driver saga Listener", () => {
  it("listenToSocket ", () => {
    const listenToSocketGenerator = listenToSocket();
    expect(listenToSocketGenerator.next().value).toEqual(
      takeLatest(SocketActionTypes.SOCKET_ON, driverSocketFlow)
    );
  });
});

describe("Getters", () => {
  let socket;
  beforeEach(() => {
    socket = new MockedSocket();
    io.mockReturnValue(socket);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("get socket object", () => {
    getSocket({ socket: { socket: socket } });
  });
});

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
    expect(generator.next().value).toEqual(take(SocketActionTypes.SOCKET_OFF));

    expect(generator.next(socket).value.payload.fn).toEqual(
      call(disconnect, socket).payload.fn
    );

    expect(generator.next().value).toEqual(cancel());
  });
});

describe("read_Emit_Or_Write_Emit Generator socket.on or socket.emit", () => {
  let socket;
  beforeEach(() => {
    socket = new MockedSocket();
    io.mockReturnValue(socket);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("it should prepare socket.on", () => {
    const generatorReadWrite = read_Emit_Or_Write_Emit(socket);

    expect(generatorReadWrite.next().value).toEqual(fork(read, socket));
  });
});

describe("Read Generator function", () => {
  let socket;
  beforeEach(() => {
    socket = new MockedSocket();
    io.mockReturnValue(socket);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("it should prepare socket.on", () => {
    const mockedChannel = channel();
    const generatorRead = read(socket);

    expect(generatorRead.next().value).toEqual(call(socketDriverOn, socket));
    //https://github.com/redux-saga/redux-saga/issues/597#issuecomment-255329604
    expect(generatorRead.next(mockedChannel).value).toEqual(
      take(mockedChannel)
    );

    expect(generatorRead.next(mockedChannel).value).toEqual(put(mockedChannel));
  });
});
