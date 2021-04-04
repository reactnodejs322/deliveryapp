import OrdersActionTypes from "./orders.types";
import {
  addDragDropToCollection,
  getCurrentDragandDrop,
  PresistOrderColumn,
  SaveDragDropCollection,
  initalizeDriverDragDrop,
  PresistAllColumns,
  RemoveDriverFromDragAndDrop,
} from "./orders.utils";
import { differenceBy } from "lodash";
const INITIAL_STATE = {
  showorders: false,
  apiorders: {},
  dragdropcollection: [],
  currentdragdrop: {},
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrdersActionTypes.ADD_DRAG_DROP_TO_COLLECTION:
      return {
        ...state,
        dragdropcollection: addDragDropToCollection(
          state.dragdropcollection,
          action.payload
        ),
        currentdragdrop: getCurrentDragandDrop(
          state.dragdropcollection,
          action.payload
        ),
      };

    case OrdersActionTypes.PERSIST_ORDER_COLUMN:
      const NewDragDropData = PresistOrderColumn(
        state.currentdragdrop,
        action.payload
      );

      return {
        ...state,
        currentdragdrop: { ...NewDragDropData },
        dragdropcollection: SaveDragDropCollection(
          state.dragdropcollection,
          NewDragDropData
        ),
      };
    case OrdersActionTypes.PERSIST_ALL_COLUMN:
      const NewDragAllDropData = PresistAllColumns(
        state.currentdragdrop,
        action.payload
      );

      return {
        ...state,
        currentdragdrop: { ...NewDragAllDropData },
        dragdropcollection: SaveDragDropCollection(
          state.dragdropcollection,
          NewDragAllDropData
        ),
      };
    /*

    When a manager connects to a store and disconnects and the
    drivers are incoming and leaving  in the background
    Initalize driver will update the drag and drop
    
    */
    case OrdersActionTypes.INITALIZE_DRIVER_FOR_DRAG_AND_DROP:
      //first find drag drop in collection
      const currentDragDrop = state.dragdropcollection.find(
        (collection) => collection.storename === action.payload.storename
      );

      if (currentDragDrop === undefined) return { ...state };

      const newDriver = differenceBy(
        action.payload.driver,
        currentDragDrop.currentdriver,
        "employeeId"
      );

      const RemoveDriver = differenceBy(
        currentDragDrop.currentdriver,
        action.payload.driver,
        "employeeId"
      );

      const NewDragDrop = initalizeDriverDragDrop(
        currentDragDrop,
        newDriver,
        RemoveDriver
      );

      return {
        ...state,

        // if you don't specify a new Object then react components will not update
        currentdragdrop: {
          ...NewDragDrop,
          currentdriver: [...action.payload.driver],
        },
        dragdropcollection: SaveDragDropCollection(state.dragdropcollection, {
          ...NewDragDrop,
          currentdriver: [...action.payload.driver],
        }),
      };
    case OrdersActionTypes.REMOVE_DRIVER_FOR_DRAG_AND_DROP:
      const NewDriver = RemoveDriverFromDragAndDrop(
        state.currentdragdrop,
        action.payload
      );

      return {
        ...state,
        currentdragdrop: { ...NewDriver },
        dragdropcollection: SaveDragDropCollection(state.dragdropcollection, {
          ...NewDriver,
        }),
      };

    //API UPDATES
    case OrdersActionTypes.ORDER_API_SUCCESS:
      return {
        ...state,
        apiorders: action.payload,
      };
    //UI UPDATES
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

    default:
      return state;
  }
};

export default ordersReducer;
