import {
  addDragDropToCollection,
  getCurrentDragandDrop,
  persistOrderColumn,
  persistAllColumn,
  deltaDriverDragDrop,
  removeDriverFromDragAndDrop,
  getDriverWithOrders,
} from "./orders.utils";
import { cloneDeep } from "lodash";

const mockCurrentDragDropWithDrivers = {
  columnOrder: ["column-1", "5578"],
  columns: {
    5578: {
      firstName: "Ikit",
      id: "5578",
      isActive: false,
      isAdmin: false,
      lastName: "Claw",
      orderIds: [],
      __v: 0,
      _id: "5fe363a3a00b6286d0a20681",
    },
    "column-1": {
      id: "column-1",
      orderIds: ["606385ce29a30529c486098c", "606385ce29a30529c486098d"],
      title: "Orders",
    },
  },
  orders: {
    "606385ce29a30529c486098c": {
      address: "5479 Pine Ln, Coral Springs, FL 33067, USA",
      date: "3/30/2021",
      geocode: { lat: 26.2975058, lng: -80.235486 },
      orderNumber: 82,
      phone: "954-753-4148 ",
      status: "unassigned",
      time: { hour: 18, minute: 10 },
      __v: 0,
      _id: "606385ce29a30529c486098c",
    },
  },
  storename: "",
};

const mock_incoming_driver = [
  {
    id: 5578,
    firstName: "Ikit",
    isActive: false,
    isAdmin: false,
    lastName: "Claw",
    __v: 0,
    _id: "5fe363a3a00b6286d0a20681",
  },
];

describe("utlities for SETUP_CURRENT_DRAG_DROP", () => {
  const mockPayload = {
    orders: [
      {
        address: "3620 NW 59TH PLACE",
        city: " COCONUT CREEK",
        date: " Feb 17",
        orderNumber: 50,
        phone: "5612996419 ",
        status: "completed",
        __v: 0,
        _id: "6038546f26348019c05b7049",
      },
    ],
    storename: "Royal Palm",
  };
  const MockexistingOrderInCollection = [
    {
      columnOrder: ["column-1"],
      columns: {},
      orders: {},
      storename: "Royal Palm",
    },
  ];

  const MockCurrentDragDrop = {
    columnOrder: ["column-1"],
    columns: {
      "column-1": { id: "column-1", orderIds: [], title: "Orders" },
    },
    orders: {},
    storename: "",
  };

  const expectedDragDrop = {
    columnOrder: ["column-1"],
    columns: {
      "column-1": {
        id: "column-1",
        title: "Orders",
        orderIds: ["6038546f26348019c05b7049"],
      },
    },

    orders: {
      "6038546f26348019c05b7049": {
        address: "3620 NW 59TH PLACE",
        city: " COCONUT CREEK",
        date: " Feb 17",
        phone: "5612996419 ",
        status: "completed",
        __v: 0,
        orderNumber: 50,
        _id: "6038546f26348019c05b7049",
      },
    },
    storename: "Royal Palm",
  };

  it("addDragDropToCollection check append, check if array", () => {
    const dragdropcollection = addDragDropToCollection(
      [],
      MockCurrentDragDrop,
      mockPayload
    );
    //check if something was added
    expect(dragdropcollection.length).toBeGreaterThan(0);
    // // // check if it's equal to 1
    expect(dragdropcollection.length).toEqual(1);
    // // check if array
    expect(Array.isArray(dragdropcollection)).toBe(true);

    expect(dragdropcollection[0]).toEqual(expectedDragDrop);
  });
  it("addDragDropToCollection check if orders were added correctly", () => {
    expect(
      addDragDropToCollection(
        MockexistingOrderInCollection,
        MockCurrentDragDrop,
        mockPayload
      )
    ).toEqual(MockexistingOrderInCollection);
  });
  it("getCurrentDragandDrop check if currentdragdrop equals the currentDragdrop in collections", () => {
    expect(
      getCurrentDragandDrop(
        MockexistingOrderInCollection,
        MockCurrentDragDrop,
        mockPayload
      )
    ).toEqual(MockexistingOrderInCollection[0]);
  });
});

describe("utlities for PERSIST_ORDER_COLUMN", () => {
  const MockCurrentDragDrop = {
    columnOrder: ["column-1"],
    columns: {
      "column-1": {
        id: "column-1",
        orderIds: ["606385ce29a30529c486098c", "606385ce29a30529c486098d"],
        title: "Orders",
      },
    },
    orders: {},
    storename: "",
  };
  const mockDragPropertiesInColumn = {
    destination: {
      droppableId: "column-1",
      index: 1,
    },
    draggableId: "606385ce29a30529c486098c",
    source: {
      droppableId: "column-1",
      index: 0,
    },
    start: {
      id: "column-1",
      orderIds: ["606385ce29a30529c486098c", "606385ce29a30529c486098d"],
      title: "Orders",
    },
    startorderids: ["606385ce29a30529c486098c", "606385ce29a30529c486098d"],
  };

  it("persistOrderColumn check if item was dragged in current column", () => {
    //Clone deep because it's operation below modifies CurrentDragdrop
    let mockSwappedOrderIdsCurrentDragDrop = cloneDeep(MockCurrentDragDrop);
    // just swapping two arrays
    let {
      columns: {
        "column-1": { orderIds },
      },
    } = mockSwappedOrderIdsCurrentDragDrop;
    let temp = orderIds[0];
    orderIds[0] = orderIds[1];
    orderIds[1] = temp;
    expect(
      persistOrderColumn(MockCurrentDragDrop, mockDragPropertiesInColumn)
    ).toEqual(mockSwappedOrderIdsCurrentDragDrop);
  });
});

describe("utlities for PERSIST_ALL_COLUMN", () => {
  const mockDragPropertiesAllColumn = {
    destination: {
      droppableId: "5578",
      index: 0,
    },
    draggableId: "606385ce29a30529c486098c",
    finish: {
      firstName: "Ikit",
      id: "5578",
      isActive: false,
      isAdmin: false,
      lastName: "Claw",
      orderIds: [],
      __v: 0,
      _id: "5fe363a3a00b6286d0a20681",
    },
    finishorderids: [],
    source: {
      droppableId: "column-1",
      index: 0,
    },
    start: {
      id: "column-1",
      orderIds: ["606385ce29a30529c486098c", "606385ce29a30529c486098d"],
      title: "Orders",
    },
    startorderids: ["606385ce29a30529c486098c", "606385ce29a30529c486098d"],
  };

  it("persistAllColumn", () => {
    persistAllColumn(
      mockCurrentDragDropWithDrivers,
      mockDragPropertiesAllColumn
    );
  });
});

describe("utlities for DELTA_DRIVER_FOR_DRAG_AND_DROP", () => {
  it("deltaDriverDragDrop called", () => {
    deltaDriverDragDrop(mockCurrentDragDropWithDrivers, mock_incoming_driver);
  });
});

describe("utlities for REMOVE_DRIVER_FROM_DRAG_AND_DROP", () => {
  const MockCurrentDragDrop = {
    columnOrder: ["column-1", "5578"],
    columns: {
      "column-1": {
        id: "column-1",
        orderIds: ["606385ce29a30529c486098c", "606385ce29a30529c486098d"],
        title: "Orders",
      },
      5578: {
        id: "5578",
        orderIds: [],
        title: "karl",
      },
    },
    orders: {},
    storename: "",
  };

  it("removeDriverFromDragAndDrop called", () => {
    removeDriverFromDragAndDrop(MockCurrentDragDrop, {
      currentdrivers: [],
      remove: 5578,
    });
  });
});

describe("utlities for SAVE_ORDER", () => {
  const mockColumn = {
    5578: {
      firstName: "Ikit",
      id: "5578",
      isActive: false,
      isAdmin: false,
      lastName: "Claw",
      orderIds: [],
      __v: 0,
      _id: "5fe363a3a00b6286d0a20681",
    },
    "column-1": {
      id: "column-1",
      orderIds: ["606385ce29a30529c486098c"],
      title: "Orders",
    },
  };

  const orders = {
    "606385ce29a30529c486098c": {
      address: "5479 Pine Ln, Coral Springs, FL 33067, USA",
      date: "3/30/2021",
      geocode: { lat: 26.2975058, lng: -80.235486 },
      orderNumber: 82,
      phone: "954-753-4148 ",
      status: "unassigned",
      time: { hour: 18, minute: 10 },

      _id: "606385ce29a30529c486098c",
    },
  };

  it("getDriverWithOrders", () => {
    getDriverWithOrders(mockColumn, orders);
  });
});
