import axios from "axios";

/*
ACTION TYPE FOR "ADD_DRAG_DROP_TO_COLLECTION"

If a store exist within a draganddropcollection then we leave it as is
otherwise if the manager clicks on a new store then 
we generate a newDragAndDrop and add it to draganddrop collection

*/
export const addDragDropToCollection = (
  dragdropcollection,
  { orders: NewOrders, storename: NewStoreName }
) => {
  const existingDragDrop = dragdropcollection.find(
    (collection) => collection.storename === NewStoreName
  );
  // if the drag and drop is in the collection?
  if (existingDragDrop) return dragdropcollection;

  return [...dragdropcollection, CreateNewDragDrop(NewOrders, NewStoreName)];
};
/*
ACTION TYPE FOR "ADD_DRAG_DROP_TO_COLLECTION"

We look for the current Draganddrop from a specific store
by iterating through the Draganddropcollection.
if we find it then we set the currentdragdrop
Otherwise we create a newdragdrop and set it to the currentdragdrop

*/
export const getCurrentDragandDrop = (
  dragdropcollection,
  { orders: NewOrders, storename: NewStoreName }
) => {
  const existingDragDrop = dragdropcollection.find(
    (collection) => collection.storename === NewStoreName
  );
  // if the drag and drop is in the collection?
  if (existingDragDrop) return existingDragDrop;

  return CreateNewDragDrop(NewOrders, NewStoreName);
};

//ACTION TYPE FOR "PERSIST_ORDER_COLUMN"
export const PresistOrderColumn = (
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
  return newDragDropData;
};

export const PresistAllColumns = (
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
export const SaveDragDropCollection = (dragdropcollection, NewDragDropData) => {
  return dragdropcollection.map((dragdrop) =>
    dragdrop.storename === NewDragDropData.storename
      ? NewDragDropData
      : dragdrop
  );
};

//ACTION TYPE FOR "INITALIZE_DRIVER_FOR_DRAG_AND_DROP"
export const initalizeDriverDragDrop = (dragdrop, NewDriver, RemoveDriver) => {
  NewDriver.forEach(
    ({ employeeId, ...the_rest_of_the_object_data_without_employeeid }) => {
      dragdrop.columns[employeeId.toString()] = {
        id: employeeId.toString(),
        orderIds: [],
        ...the_rest_of_the_object_data_without_employeeid,
      };
      dragdrop.columnOrder.push(employeeId.toString());
    }
  );

  let restoreOrdersIds = []; //retore the ids back to the Order Column
  let deletedriver = []; //update the order column

  RemoveDriver.forEach(({ employeeId }) => {
    deletedriver.push(employeeId.toString());
    restoreOrdersIds.push(dragdrop.columns[employeeId.toString()].orderIds);
    delete dragdrop.columns[employeeId.toString()];
  });

  if (deletedriver.length) {
    dragdrop.columnOrder = dragdrop.columnOrder.filter(
      (x) => !deletedriver.includes(x)
    );
    //because restoreOrderIds is collections of arrays
    let flattenRestoreOrderIds = [].concat.apply([], restoreOrdersIds);
    dragdrop.columns["column-1"].orderIds = [
      ...dragdrop.columns["column-1"].orderIds,
      ...flattenRestoreOrderIds,
    ];
  }

  return dragdrop;
};
export const RemoveDriverFromDragAndDrop = (
  dragdrop,
  //remove(int)
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

//This Parses the data that we feed it and turns it into a draganddrop
export const CreateNewDragDrop = (NewOrders, NewStoreName) => {
  let newDragDropData = {
    storename: NewStoreName,
    orders: {},
    columns: {
      "column-1": {
        id: "column-1",
        title: "Orders",
        orderIds: [],
      },
    },
    columnOrder: ["column-1"],
  };
  NewOrders.forEach((order) => {
    //create a newObject without the key ordernumber
    let { orderNumber, ...WithoutorderNumber } = order;
    // put orderNumber back in the object however rename it as
    WithoutorderNumber["id"] = orderNumber.toString();

    newDragDropData.orders[orderNumber] = WithoutorderNumber;
    //push data into column 1 orderIds
    newDragDropData.columns["column-1"].orderIds.push(orderNumber.toString());
  });
  return newDragDropData;
};

export const fetchOrders = () => {
  var CancelToken = axios.CancelToken;
  var { token } = CancelToken.source();
  return axios
    .get("/api/orders", { cancelToken: token })
    .then((res) => res.data);
};
