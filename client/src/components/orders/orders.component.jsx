//external libraries
import React from "react";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
//styling
import { Container, ContainerDriver, ContainerOrder } from "./orders.styles";
//actions
import {
  persistOrderColumn,
  persistAllColumn,
} from "../../redux/orders/orders.action";
//components
import Column from "../column/column.component";

export const Orders = ({
  persistOrderColumn,
  persistAllColumn,
  currentdragdrop,
}) => {
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    // if it went out of bounds we don't do anything etheir
    if (!destination) {
      return;
    }
    // if a draggable object stayed at the same position then
    // we don't need to do anything
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = currentdragdrop.columns[source.droppableId];
    const finish = currentdragdrop.columns[destination.droppableId];

    // If a draggable object remained in the first column
    // we presist the value within the first column
    if (start === finish) {
      persistOrderColumn({
        startorderids: start.orderIds,
        start: start,
        source: source,
        destination: destination,
        draggableId: draggableId,
      });
      return;
    } else {
      persistAllColumn({
        startorderids: start.orderIds,
        finishorderids: finish.orderIds,
        source: source,
        destination: destination,
        draggableId: draggableId,
        start: start,
        finish: finish,
      });
    }
  };
  //Array of html elements
  let dom_elements_of_drivers = [];

  return (
    <div>
      <Container>
        <DragDropContext onDragEnd={onDragEnd}>
          {currentdragdrop.columnOrder.map((columnId, index) => {
            const column = currentdragdrop.columns[columnId];
            // console.log("error", column.orderIds);
            const orders = column.orderIds.map(
              (orderIds) => currentdragdrop.orders[orderIds]
            );

            if (column.id === "column-1") {
              return (
                <ContainerOrder key={index}>
                  <Column
                    delete_mark={false}
                    key={column.id}
                    column={column}
                    orders={orders}
                  />
                </ContainerOrder>
              );
            } else {
              dom_elements_of_drivers.push(
                <Column
                  delete_mark={true}
                  key={column.id}
                  column={column}
                  orders={orders}
                />
              );
            }
            //At the final iteration we want to display the driver in a containerized
            // div
            if (currentdragdrop.columnOrder.length - 1 === index) {
              return (
                <ContainerDriver key={index}>
                  {dom_elements_of_drivers.map((e, i) => e)}
                </ContainerDriver>
              );
            }
            return null; //placeholder
          })}
        </DragDropContext>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentdragdrop: state.orders.currentdragdrop,
});

const mapDispatchToProps = (dispatch) => ({
  persistOrderColumn: (onDragEndProperties) =>
    dispatch(persistOrderColumn(onDragEndProperties)),
  persistAllColumn: (onDragEndProperties) =>
    dispatch(persistAllColumn(onDragEndProperties)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
