import OrdersActionTypes from "./orders.types";
import {
  // putOrderCurrentDragDrop,
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

import { cloneDeep } from "lodash";

const INITIAL_STATE = {
  showorders: false, // red arrow component ui changes

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
  apiorders: [],
  currentdragdrop: {
    columnOrder: ["column-1"],
    columns: { "column-1": { id: "column-1", orderIds: [], title: "Orders" } },
    orders: {},
    storename: "",
  },
  drivers_with_orders: [],
  updated_status_order: {},
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrdersActionTypes.SOCKET_ORDER_DELETE:
      let deleteOrderCurrentdragdrop = cloneDeep(state.currentdragdrop);
      let DeleteApiOrders = cloneDeep(state.apiorders);
      const {
        [`${action.payload._id}`]: order,
      } = deleteOrderCurrentdragdrop.orders;
      //edge case if  order never existed then dont crash the ui
      if (order === undefined) {
        alert("tried deleting an order that did not exist");
        return { ...state };
      }

      //Lives in Some driver Column
      if (order.livesInColumn) {
        const { livesInColumn } = deleteOrderCurrentdragdrop.orders[
          action.payload._id
        ];
        deleteOrderCurrentdragdrop.columns[
          livesInColumn
        ].orderIds = deleteOrderCurrentdragdrop.columns[
          livesInColumn
        ].orderIds.filter((mongoId) => mongoId !== action.payload._id);
        console.log("Order lives in Column", deleteOrderCurrentdragdrop);
      } else {
        //Lives in Unassigned Order
        const { orderIds } = deleteOrderCurrentdragdrop.columns["column-1"];

        deleteOrderCurrentdragdrop.columns[
          "column-1"
        ].orderIds = orderIds.filter(
          (mongoId) => mongoId !== action.payload._id
        );
      }
      //delete order
      delete deleteOrderCurrentdragdrop.orders[action.payload._id];

      //update APIORDERS

      DeleteApiOrders = DeleteApiOrders.filter(
        (order) => order._id !== action.payload._id
      );
      return {
        ...state,
        currentdragdrop: deleteOrderCurrentdragdrop,
        apiorders: DeleteApiOrders,
      };

    case OrdersActionTypes.SOCKET_ORDER_UPDATE:
      let UpdateOrderStatusCurrentDragdrop = cloneDeep(state.currentdragdrop);
      let UpdateApiOrders = cloneDeep(state.apiorders);

      const {
        [`${action.payload._id}`]: OrderInDnd,
      } = UpdateOrderStatusCurrentDragdrop.orders;
      //edge case if  order never existed then dont crash the ui
      if (OrderInDnd === undefined) {
        alert("tried updating an order that did not exist");
        return { ...state };
      }

      if (action.payload.status === "completed") {
        //We need to find where the order lives in for we can delete it

        //Lives in Some driver Column
        if (OrderInDnd.livesInColumn) {
          const { livesInColumn } = UpdateOrderStatusCurrentDragdrop.orders[
            action.payload._id
          ];
          UpdateOrderStatusCurrentDragdrop.columns[
            livesInColumn
          ].orderIds = UpdateOrderStatusCurrentDragdrop.columns[
            livesInColumn
          ].orderIds.filter((mongoId) => mongoId !== action.payload._id);
          console.log(
            "Order lives in Column",
            UpdateOrderStatusCurrentDragdrop
          );
        } else {
          //Lives in Unassigned Order
          const { orderIds } = UpdateOrderStatusCurrentDragdrop.columns[
            "column-1"
          ];

          UpdateOrderStatusCurrentDragdrop.columns[
            "column-1"
          ].orderIds = orderIds.filter(
            (mongoId) => mongoId !== action.payload._id
          );
        }
        //delete order
        delete UpdateOrderStatusCurrentDragdrop.orders[action.payload._id];

        //update APIORDERS

        UpdateApiOrders = UpdateApiOrders.filter(
          (order) => order._id !== action.payload._id
        );
      }
      // update Orders text doesnt matter what column it lives in
      if (action.payload.status === "on_route") {
        //update the drag drop order status
        UpdateOrderStatusCurrentDragdrop.orders[action.payload._id].status =
          action.payload.status;
        //update the api order status for the map
        UpdateApiOrders = UpdateApiOrders.map((order) => {
          if (order._id === action.payload._id) {
            return {
              ...order,
              status: "on_route",
            };
          }
          return order;
        });
      }

      return {
        ...state,
        currentdragdrop: UpdateOrderStatusCurrentDragdrop,
        apiorders: UpdateApiOrders,
        updated_status_order: action.payload,
      };

    case OrdersActionTypes.SOCKET_ORDER_NEW:
      const new_order = action.payload;
      console.log("SOCKET_ORDER_NEW", action.payload);
      let OrderNewCurrentDragdrop = { ...state.currentdragdrop };
      OrderNewCurrentDragdrop.orders[new_order._id] = new_order;

      OrderNewCurrentDragdrop.columns["column-1"].orderIds.push(new_order._id);

      //Never duplicate
      OrderNewCurrentDragdrop.columns["column-1"].orderIds = [
        ...new Set(OrderNewCurrentDragdrop.columns["column-1"].orderIds),
      ];

      return {
        ...state,
        apiorders: [...state.apiorders, action.payload],
        currentdragdrop: OrderNewCurrentDragdrop,
        // dragdropcollection: saveDragDropCollection(
        //   state.dragdropcollection,
        //   newOrderDragDrop
        // ),
      };
    //actiontype setupCurrentDragDrop
    case OrdersActionTypes.SETUP_CURRENT_DRAG_DROP:
      return {
        ...state,
        apiorders: action.payload.orders,
        dragdropcollection: addDragDropToCollection(
          state.dragdropcollection,
          state.currentdragdrop,
          action.payload
        ),
        currentdragdrop: getCurrentDragandDrop(
          state.dragdropcollection,
          state.currentdragdrop,
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
      console.log(state.currentdragdrop);
      console.log(action.payload);
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
      console.log(
        state.currentdragdrop.columns,
        " ",
        state.currentdragdrop.orders
      );
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
    case OrdersActionTypes.EXPAND_ORDER_DRAG_DROP_SIDEBAR:
      return {
        ...state,
        showorders: true,
      };
    case OrdersActionTypes.COMPRESS_ORDER_DRAG_DROP_SIDEBAR:
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
