import axios from "axios";
import { differenceBy } from "lodash";
import { eventChannel } from "redux-saga";
import { cloneDeep } from "lodash";
import {
  socketOrderNew,
  socketOrderUpdate,
  socketOrderDelete,
} from "./orders.action";
/*ACTION TYPE FOR "SETUP_CURRENT_DRAG_DROP"
If a store exist within a draganddropcollection then we leave it as is
otherwise if the manager clicks on a new store then 
we generate a newDragAndDrop and add it to draganddrop collectio*/

export function disconnect(socket) {
  socket.disconnect();
}
export function socketOrderOn(socket) {
  return eventChannel((emit) => {
    socket.on("orders-new", (New_Order) => {
      console.log('socket.on("orders-new")', New_Order);
      emit(socketOrderNew(New_Order));
    });
    socket.on("order-updates", (Order_With_Updated_Status) => {
      console.log('socket.on("order-updates")', Order_With_Updated_Status);
      emit(socketOrderUpdate(Order_With_Updated_Status));
    });

    socket.on("order-delete", (Delete_Order) => {
      console.log('socket.on("order-delete")', Delete_Order);
      emit(socketOrderDelete(Delete_Order));
    });

    socket.on("disconnect", (e) => {
      console.log("Order Socket", e);
    });
    return () => {
      socket.disconnect();
    };
  });
}

export const putOrderCurrentDragDrop = (currentdragdrop, orders) => {
  orders.forEach(({ orderNumber, ...data }, index) => {
    currentdragdrop.orders[orderNumber.toString()] = {
      id: orderNumber.toString(),
      ...data,
    };
    currentdragdrop.columns["column-1"].orderIds.push(orderNumber.toString());
  });

  return { ...currentdragdrop };
};

export const addDragDropToCollection = (
  dragdropcollection,
  currentdragdrop,
  { orders: NewOrders, storename: NewStoreName }
) => {
  const existingDragDrop = dragdropcollection.find(
    (collection) => collection.storename === NewStoreName
  );

  if (existingDragDrop) {
    return dragdropcollection;
  }

  //if it doesn't exist then take the existing dragdropcollection and add a new dragdrop to it
  return [
    ...dragdropcollection,
    generateCurrentDragDrop(currentdragdrop, NewOrders, NewStoreName),
  ];
};
export const generateCurrentDragDrop = (
  currentdragdrop,
  NewOrders,
  NewStoreName
) => {
  const newDragdrop = cloneDeep(currentdragdrop);
  NewOrders.forEach((order, i) => {
    newDragdrop.orders[order._id] = order;
    newDragdrop.columns["column-1"].orderIds.push(order._id);
  });
  newDragdrop.storename = NewStoreName;
  return newDragdrop;
};

/* ACTION TYPE FOR "SETUP_CURRENT_DRAG_DROP"
We look for the current Draganddrop from a specific store
by iterating through the Draganddropcollection.
if we find it then we set the currentdragdrop
Otherwise we create a newdragdrop and set it to the currentdragdrop*/
export const getCurrentDragandDrop = (
  dragdropcollection,
  currentdragdrop,
  { orders: NewOrders, storename: NewStoreName }
) => {
  const existingDragDrop = dragdropcollection.find(
    (collection) => collection.storename === NewStoreName
  );
  // if the drag and drop is in the collection?
  if (existingDragDrop) return existingDragDrop;

  //otherwise generate new currentdragdrop
  return generateCurrentDragDrop(currentdragdrop, NewOrders, NewStoreName);
};

//ACTION TYPE FOR "PERSIST_ORDER_COLUMN"
export const persistOrderColumn = (
  currentDragDropData,
  //OnDragEndProperties
  { destination, draggableId, source, start, startorderids }
) => {
  const newOrderIds = Array.from(startorderids);

  newOrderIds.splice(source.index, 1);
  newOrderIds.splice(destination.index, 0, draggableId);
  const newColumn = {
    ...start,
    orderIds: newOrderIds,
  };
  const newDragDropData = {
    ...currentDragDropData,
    columns: {
      ...currentDragDropData.columns,
      [newColumn.id]: newColumn,
    },
  };
  return { ...newDragDropData };
};

export const persistAllColumn = (
  currentDragDropData,
  {
    startorderids,
    finishorderids,
    source,
    destination,
    draggableId,
    start,
    finish,
  }
) => {
  const Newstartorderids = Array.from(startorderids);

  Newstartorderids.splice(source.index, 1);

  const newStart = {
    ...start,
    orderIds: Newstartorderids,
  };
  const Newfinishorderids = Array.from(finishorderids);

  Newfinishorderids.splice(destination.index, 0, draggableId);

  const newFinish = {
    ...finish,
    orderIds: Newfinishorderids,
  };

  /* when manager presses the x mark next to an order we need to know the driverId COLUMN
  the UI is capable of getting the OrderNumber when manager clicks x mark with onClick method
  however if we just use the orderNumber we would have to loop through all the drivers COLUMN
  to find the order and delete and put it back in the order column
  So a solution for this is when an order is dragged to different column
  give it a livesInColumn key IN ORDERS OBJECT  by doing the following below*/

  if (draggableId in currentDragDropData.orders)
    // O(1) time complexity
    // search key with driverId '4545 'in orders
    currentDragDropData.orders[`${draggableId}`] = {
      ...currentDragDropData.orders[`${draggableId}`], //because we want order to have current address,orderNumber, time, etc...
      livesInColumn: finish.id, // driverId
      livesInNameColumn: finish.firstName + " " + finish.lastName, // for css
    };

  const newDragDropData = {
    ...currentDragDropData,
    columns: {
      ...currentDragDropData.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    },
  };

  return newDragDropData;
};

//ACTION TYPE FOR "PERSIST_ORDER_COLUMN"
export const saveDragDropCollection = (dragdropcollection, NewDragDropData) => {
  return dragdropcollection.map((dragdrop) =>
    dragdrop.storename === NewDragDropData.storename
      ? NewDragDropData
      : dragdrop
  );
};
//FUNCTION FOR ACTION TYPE FOR "DELTA_DRIVER_FOR_DRAG_AND_DROP"
export const addDriver = (drivers, currentdragdrop) => {
  /*drivers                       = [{employeeId: 4545'}]

  currentdragdrop.currentdriver = [{employeeId:'4545'}, {employeeId:'5578'}, {employeeId::"8954"}]

  because both drivers and currentdriver contain [{employeeId: 4545'}]

  the output is [{employeeId:'5578'},{employeeId::"8954"}]*/
  const add_driver = differenceBy(
    drivers,
    currentdragdrop.currentdriver,
    "employeeId"
  );

  /*We iterate through the addDriver the drivers that were just added
  and create new KEYS and VALUES for currentdragdrop object

  currentdragdrop:{
  columnOrder: (3) ["column-1", "5578", "8954"] <- drivers to be added
  columns: {5578: {…}, 8954: {…}, column-1: {…}} <- drivers to be added
  }
  */
  add_driver.forEach(
    ({ employeeId, ...the_rest_of_the_object_data_without_employeeid }) => {
      currentdragdrop.columns[employeeId.toString()] = {
        id: employeeId.toString(),
        orderIds: [],
        ...the_rest_of_the_object_data_without_employeeid,
      };
      currentdragdrop.columnOrder.push(employeeId.toString());
    }
  );
  return currentdragdrop;
};
//FUNCTION FOR ACTION TYPE FOR "DELTA_DRIVER_FOR_DRAG_AND_DROP"
export const removeDriver = (drivers, currentdragdrop) => {
  const removedriver = differenceBy(
    currentdragdrop.currentdriver,
    drivers,
    "employeeId"
  );

  // if there's nothing to remove we just return the currentdragdrop
  if (removedriver.length === 0) return currentdragdrop;

  let restoreOrdersIds = []; //retore the ids back to the Order Column
  let deletedriver = []; //update the order column

  removedriver.forEach(({ employeeId }) => {
    deletedriver.push(employeeId.toString());
    restoreOrdersIds.push(
      currentdragdrop.columns[employeeId.toString()].orderIds
    );
    delete currentdragdrop.columns[employeeId.toString()];
  });

  // filter to remove a number in an array
  currentdragdrop.columnOrder = currentdragdrop.columnOrder.filter(
    (x) => !deletedriver.includes(x)
  );
  // because restoreOrderIds is collections of arrays
  // like this orderIds = [['15',16], ['12','13']]
  // we flatten it like this ['15','16','12','13']
  let flattenRestoreOrderIds = [].concat.apply([], restoreOrdersIds);
  currentdragdrop.columns["column-1"].orderIds = [
    ...currentdragdrop.columns["column-1"].orderIds,
    ...flattenRestoreOrderIds,
  ];

  return currentdragdrop;
};

//ACTION TYPE FOR "DELTA_DRIVER_FOR_DRAG_AND_DROP"
export const deltaDriverDragDrop = (currentdragdrop, incoming_driver) => {
  //Check if a driver was added or removed
  currentdragdrop = addDriver(incoming_driver, currentdragdrop);
  currentdragdrop = removeDriver(incoming_driver, currentdragdrop);
  return {
    ...currentdragdrop,
    currentdriver: [...incoming_driver],
  };
};

// ACTION TYPE FOR REMOVE_DRIVER_FROM_DRAG_AND_DROP  when driver disconnects
// update the drag and drop
export const removeDriverFromDragAndDrop = (
  dragdrop,
  { currentdrivers, remove }
) => {
  dragdrop.currentdriver = currentdrivers;
  dragdrop.columnOrder = dragdrop.columnOrder.filter(
    (item) => item !== remove.toString()
  );
  let restoreOrder = dragdrop.columns[remove.toString()].orderIds; //grab the removed driver orderids
  dragdrop.columns["column-1"].orderIds = dragdrop.columns[
    "column-1"
  ].orderIds.concat(restoreOrder);
  delete dragdrop.columns[remove.toString()];
  return dragdrop;
};

// ACTION TYPE FOR SAVE  When manager hits save button
export const getDriverWithOrders = (drivers, orders) => {
  let drivers_with_orders = []; // list saved  multiple drivers
  for (const i in drivers) {
    const {
      orderIds, //array
      id, //string
    } = drivers[i];

    //skip column-1 we don't need column-1 lol?
    if (id === "column-1") continue; // continue means skip within our loop

    const driver_with_orders = {
      orders: [], // where the saved orders reside in
      ...drivers[i], // saved driver's firstName, lastName, etc..
    };

    // convert orderids array ['50','60'] to  [{address:'smithy jenkinz house'}, {{address:'felipe's rat house'}}]
    orderIds.forEach((orderid, index) => {
      // use '50','60' to search key  in orders['50'] , orders['60'] and push the data into orders
      driver_with_orders.orders.push(orders[orderid]);
    });
    //finally after driver's orders been settled push the driver in  drivers_with_orders Array
    drivers_with_orders.push(driver_with_orders);
  }

  return drivers_with_orders;
};

export const removeorderfromDriver = (for_deletion, currentdragdrop) => {
  //lookup in columns object
  currentdragdrop.columns[for_deletion.driverid] = {
    ...currentdragdrop.columns[for_deletion.driverid], //loop up and grab it's data
    // delete the orderNumber in the array
    orderIds: currentdragdrop.columns[for_deletion.driverid].orderIds.filter(
      (item) => item !== for_deletion._id
    ),
  };
  // push the orderNumber back in the order's column
  currentdragdrop.columns["column-1"].orderIds.push(for_deletion._id);
  //return a new object because ui needs  to detect changes in memory
  return { ...currentdragdrop };
};

export const fetchOrders = () => {
  var CancelToken = axios.CancelToken;
  var { token } = CancelToken.source();
  return axios
    .get("/api/orders/", { cancelToken: token })
    .then((res) => res.data);
};
