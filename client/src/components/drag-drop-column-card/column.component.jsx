import React from "react";

import { Droppable } from "react-beautiful-dnd";
import Order from "../drag-drop-order-card/order.component";
import { Container, Title, OrderList } from "./column.styles";
/*

We will use styled components for this to changed dynamic styling with 
React Beautiful DND

*/

const Column = ({ column, orders, delete_mark }) => {
  return (
    <Container>
      <Title>
        {column.id === "column-1" ? "Unassigned Orders" : column.firstName}
      </Title>
      {/* 
        <Droppable /> components can be dropped on by a <Draggable />.
         They also contain <Draggable />s. A <Draggable /> 
         must be contained within a <Droppable />.

         It is REQUIRED to have a droppableId within the Droppable component
      */}
      <Droppable droppableId={column.id}>
        {/*Provided is props 
           Snapshot is styling props such as making the column red after a drag
        */}
        {(provided, snapshot) => (
          <OrderList
            // provided.innerRef - is to supply the DOM node to reactbeautifuldnd is callback
            ref={provided.innerRef}
            /* 
          provided.droppableProps -
          is an Object that contains properties that need 
          to be applied to a Droppable element. It needs to be 
          applied to the same element that you apply provided.innerRef 
          to. It currently contains data attributes that we use for 
          styling and lookups.
          */
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {orders.map((order, index) => (
              <Order
                delete_mark={delete_mark}
                key={order._id}
                order={order}
                index={index}
              />
            ))}
            {/* provided.placeholder Is to Increase space when something is dropped in a column */}
            {provided.placeholder}
          </OrderList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
