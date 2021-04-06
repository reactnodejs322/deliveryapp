import { addDragDropToCollection, getCurrentDragandDrop } from "./orders.utils";

describe("Testing branches(if else) orders.utlis\n\n", () => {
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

  const expectedDragDrop = {
    storename: "Royal Palm",
    orders: {
      50: {
        address: "3620 NW 59TH PLACE",
        city: " COCONUT CREEK",
        date: " Feb 17",
        phone: "5612996419 ",
        status: "completed",
        __v: 0,
        _id: "6038546f26348019c05b7049",
        id: "50",
      },
    },
    columns: {
      "column-1": { id: "column-1", title: "Orders", orderIds: ["50"] },
    },
    columnOrder: ["column-1"],
  };

  it("addDragDropToCollection FUNCTION\n\nif drag and drop does NOT exist in dragdropcollection. ADD it to dragdropcollection ARRAY ", () => {
    const dragdropcollection = addDragDropToCollection([], mockPayload);
    //check if something was added
    expect(dragdropcollection.length).toBeGreaterThan(0);
    // // check if it's equal to 1
    expect(dragdropcollection.length).toEqual(1);
    // check if array
    expect(Array.isArray(dragdropcollection)).toBe(true);

    expect(dragdropcollection[0]).toEqual(expectedDragDrop);
  });
  it("addDragDropToCollection FUNCTION\n\nif drag and drop already exist in dragdropcollection: [] return current dragdropcollection ARRAY ", () => {
    expect(
      addDragDropToCollection(MockexistingOrderInCollection, mockPayload)
    ).toEqual(MockexistingOrderInCollection);
  });
  it("getCurrentDragandDrop FUNCTION\n\nif drag and drop data already exist in dragdropcollection: [] then return the currentdragdrop OBJECT  ", () => {
    expect(
      getCurrentDragandDrop(MockexistingOrderInCollection, mockPayload)
    ).toEqual(MockexistingOrderInCollection[0]);
  });
});
