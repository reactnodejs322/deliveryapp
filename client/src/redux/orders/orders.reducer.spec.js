import OrdersActionTypes from "./orders.types";
import ordersReducer from "./orders.reducer";
import { addDragDropToCollection, getCurrentDragandDrop } from "./orders.utils";
//https://www.youtube.com/watch?v=UOGxfvNwv-8
describe("Order Reducer", () => {
  const defaultState = {
    showorders: false,
    apiorders: [],
    dragdropcollection: [],
    currentdragdrop: {
      columnOrder: ["column-1"],
      columns: {
        "column-1": { id: "column-1", orderIds: [], title: "Orders" },
      },
      orders: {},
      storename: "",
    },
    drivers_with_orders: [],
    updated_status_order: {},
  };
  it("should return default state", () => {
    const newState = ordersReducer(undefined, {});
    expect(newState).toEqual(defaultState);
  });

  it("should return new state if receiving type SETUP_CURRENT_DRAG_DROP", () => {
    const mockPayload = {
      //Api orders
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
    // we pass a payload to the reducer and expect a new state
    const newState = ordersReducer(undefined, {
      type: OrdersActionTypes.SETUP_CURRENT_DRAG_DROP,
      payload: mockPayload,
    });

    // //we mimick the returned object from the reducer by calling the functions from utlis
    const mockOperations = {
      ...defaultState,
      apiorders: mockPayload.orders,
      dragdropcollection: addDragDropToCollection(
        defaultState.dragdropcollection,
        defaultState.currentdragdrop,
        mockPayload
      ),
      currentdragdrop: getCurrentDragandDrop(
        defaultState.dragdropcollection,
        defaultState.currentdragdrop,
        mockPayload
      ),
      drivers_with_orders: [],
      updated_status_order: {},
    };

    expect(newState).toEqual(mockOperations);
  });
});
