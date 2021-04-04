//external libraries
import React from "react";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
//styling
import { Container, ContainerDriver, ContainerOrder } from "./orders.styles";
//actions
import {
  PresistOrderColumn,
  PresistAllColumn,
} from "../../redux/orders/orders.action";

import Column from "../column/column.component";
const Orders = ({ PresistOrderColumn, PresistAllColumn, currentdragdrop }) => {
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
      PresistOrderColumn({
        startorderids: start.orderIds,
        start: start,
        source: source,
        destination: destination,
        draggableId: draggableId,
      });
      return;
    } else {
      PresistAllColumn({
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
  let drivers = [];

  return (
    <div>
      <Container>
        <DragDropContext onDragEnd={onDragEnd}>
          {currentdragdrop.columnOrder.map((columnId, index) => {
            const column = currentdragdrop.columns[columnId];
            // console.log("error", column.orderIds);
            const tasks = column.orderIds.map(
              (orderIds) => currentdragdrop.orders[orderIds]
            );

            if (column.id === "column-1") {
              return (
                <ContainerOrder key={index}>
                  <Column key={column.id} column={column} tasks={tasks} />
                </ContainerOrder>
              );
            } else {
              drivers.push(
                <Column key={column.id} column={column} tasks={tasks} />
              );
            }
            //At the final iteration we want to display the driver in a containerized
            // div
            if (currentdragdrop.columnOrder.length - 1 === index) {
              return (
                <ContainerDriver key={index}>
                  {drivers.map((e, i) => e)}
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
  PresistOrderColumn: (onDragEndProperties) =>
    dispatch(PresistOrderColumn(onDragEndProperties)),
  PresistAllColumn: (onDragEndProperties) =>
    dispatch(PresistAllColumn(onDragEndProperties)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
