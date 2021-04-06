import OrdersActionTypes from "./orders.types";
import {
  addDragDropToCollection,
  getCurrentDragandDrop,
  persistOrderColumn,
  saveDragDropCollection,
  deltaDriverDragDrop,
  persistAllColumn,
  removeDriverFromDragAndDrop,
  getDriverWithOrders,
  removeorderfromDriver,
} from "./orders.utils";

const INITIAL_STATE = {
  showorders: false, // red arrow component ui changes
  apiorders: [],
  dragdropcollection: [], // disconnecting and reconnect things will be saved

  /*orderIds array dynamically changes when a order is being dragged to the columns key
  columns: { "5578": { id: "5578", orderIds: [], title: "Orders" } },
  meaning if i drag orders to a driver an order will get pushed to their orderids KEY
  columns: { "5578": { id: "5578", orderIds: ['50'], title: "Orders" } },
  every columns key will have an orderIds even column-1 !

  However,Note! you might run into issues with both columnOrder key and columns key
  because both have to be in sync otherwise react beautiful dnd will crash!
  columnOrder: ["column-1","4545"],
  columns: { 
    "column-1": { id: "column-1", orderIds: [], title: "Orders" },
    "4545": { id: "4545", orderIds: [], title: "Orders" },
  },
  */
  currentdragdrop: {
    columnOrder: ["column-1"],
    columns: { "column-1": { id: "column-1", orderIds: [], title: "Orders" } },
    orders: {},
    storename: "",
  },
  drivers_with_orders: [],
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrdersActionTypes.ORDER_DISPLAY_SOCKET_UPDATE:
      console.log(action.payload);
      const newOrderDragDrop = { ...state.currentdragdrop };

      return {
        ...state,
        apiorders: [...action.payload],
        // currentdragdrop: completed_order_currentdragdrop,
      };
    //actiontype addApiOrderSuccessDragDrop
    case OrdersActionTypes.ADD_APIORDER_SUCCESS_DRAG_DROP_TO_COLLECTION:
      return {
        ...state,
        apiorders: action.payload.orders,
        dragdropcollection: addDragDropToCollection(
          state.dragdropcollection,
          action.payload
        ),
        currentdragdrop: getCurrentDragandDrop(
          state.dragdropcollection,
          action.payload
        ),
      };
    // logic for dragging orders within the order column
    // useful i believe if the manager wanna play around in the order column
    // lol
    case OrdersActionTypes.PERSIST_ORDER_COLUMN:
      const NewDragDropData = persistOrderColumn(
        state.currentdragdrop,
        action.payload
      );
      return {
        ...state,
        currentdragdrop: NewDragDropData,

        /* if the manager were to disconnect and reconnect
        then the orders would be left in tacked
        */
        dragdropcollection: saveDragDropCollection(
          state.dragdropcollection,
          NewDragDropData
        ),
      };
    // when you drag orders to different columns
    // it will keep your changes in place
    case OrdersActionTypes.PERSIST_ALL_COLUMN:
      const NewDragAllDropData = persistAllColumn(
        state.currentdragdrop,
        action.payload
      );

      return {
        ...state,
        currentdragdrop: { ...NewDragAllDropData },
        dragdropcollection: saveDragDropCollection(
          state.dragdropcollection,
          NewDragAllDropData
        ),
      };

    /*When a manager connects to a store and disconnects and the
    drivers are incoming and leaving  in the background
    DELTA_DRIVER will update the drag and drop */
    case OrdersActionTypes.DELTA_DRIVER_FOR_DRAG_AND_DROP:
      //first find drag drop in collection
      const FoundDragDropInCollections = state.dragdropcollection.find(
        (collection) => collection.storename === action.payload.storename
      );

      if (FoundDragDropInCollections === undefined) return { ...state };
      const NewCurrentDragDrop = deltaDriverDragDrop(
        FoundDragDropInCollections,
        action.payload.driver
      );
      return {
        ...state,
        currentdragdrop: NewCurrentDragDrop,
        dragdropcollection: saveDragDropCollection(
          state.dragdropcollection,
          NewCurrentDragDrop
        ),
      };
    //when a driver disconnects
    case OrdersActionTypes.REMOVE_DRIVER_FROM_DRAG_AND_DROP:
      const NewDriver = removeDriverFromDragAndDrop(
        state.currentdragdrop,
        action.payload
      );
      // console.log(action.payload.remove);
      // let new_driver_with_orders =
      // console.log(new_driver_with_orders);
      return {
        ...state,
        currentdragdrop: { ...NewDriver },
        dragdropcollection: saveDragDropCollection(state.dragdropcollection, {
          ...NewDriver,
        }),
        drivers_with_orders: [
          ...state.drivers_with_orders.filter(
            (driver) => driver.id !== action.payload.remove.toString()
          ),
        ],
      };
    // when you press the save button :)
    case OrdersActionTypes.SAVE_ORDER:
      return {
        ...state,
        drivers_with_orders: getDriverWithOrders(
          //drivers in currentdragdrop
          state.currentdragdrop.columns,
          //orders in currentdragdrop
          state.currentdragdrop.orders
        ),
      };
    // when you  presss the arrow button and hit the delete all button
    case OrdersActionTypes.DISCARD_ORDER_CHANGES:
      const arrays_in_array_orderid = [];
      let Clear_All_Drivers_Order = state.currentdragdrop;
      for (const i in Clear_All_Drivers_Order.columns) {
        // we dont wanna clear order column ):
        if (Clear_All_Drivers_Order.columns[i].id === "column-1") continue; // continue means skip within our loop
        arrays_in_array_orderid.push(
          Clear_All_Drivers_Order.columns[i].orderIds
        );

        Clear_All_Drivers_Order.columns[i].orderIds = [];
      }
      const flatten_arrays_in_array_orderid = [].concat.apply(
        [],
        arrays_in_array_orderid
      );
      Clear_All_Drivers_Order.columns["column-1"].orderIds = [
        ...Clear_All_Drivers_Order.columns["column-1"].orderIds,
        ...flatten_arrays_in_array_orderid,
      ];

      return {
        ...state,
        currentdragdrop: { ...Clear_All_Drivers_Order },
        dragdropcollection: saveDragDropCollection(state.dragdropcollection, {
          ...Clear_All_Drivers_Order,
        }),
      };

    // when you hit the x mark next to a driver with
    //an order and hit  confirm button
    // within  modal :)
    case OrdersActionTypes.REMOVE_ORDER_FROM_DRIVER:
      const NewCurrentDragDrop_RemoveOrder = removeorderfromDriver(
        action.payload,
        state.currentdragdrop
      );

      return {
        ...state,
        currentdragdrop: NewCurrentDragDrop_RemoveOrder,
        dragdropcollection: saveDragDropCollection(
          state.dragdropcollection,
          NewCurrentDragDrop_RemoveOrder
        ),
      };
    //UI UPDATES for expanding and compressing side bar
    case OrdersActionTypes.ORDERS_SOCKET_ON:
      return {
        ...state,
        showorders: true,
      };
    case OrdersActionTypes.ORDERS_SOCKET_OFF:
      return {
        ...state,
        showorders: false,
      };
    // when  /api/orders fails ):
    case OrdersActionTypes.ADD_APIORDER_FAILURE_DRAG_DROP_TO_COLLECTION:
      return {
        ...state,
        apiorders: action.payload.orders,
        dragdropcollection: addDragDropToCollection(
          state.dragdropcollection,
          action.payload
        ),
        currentdragdrop: getCurrentDragandDrop(
          state.dragdropcollection,
          action.payload
        ),
      };
    default:
      return state;
  }
};

export default ordersReducer;
