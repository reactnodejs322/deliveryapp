import React from "react";
import { Draggable } from "react-beautiful-dnd";
import XmarkModalButton from "../x-mark-modal-button/x-mark-modal-button.component";

//icons
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DateRangeIcon from "@material-ui/icons/DateRange";
import FastfoodIcon from "@material-ui/icons/Fastfood";
//styled components
import {
  CardContainer,
  OrderDetailContainer,
  IconContainer,
  IconSpace,
  WhiteSideBarContainer,
  OrderNumberContainer,
  OrderTitle,
  OrderNumber,
  useIconStyles,
  useIconAddressStyles,
  XMarkContainer,
} from "./order.styles";

//Change Card height here
export const theme = {
  height: "130px",
};

const Order = ({ order, index, delete_mark }) => {
  const classes = useIconStyles();
  const classesAddress = useIconAddressStyles();

  const convertMiltaryTimeToStandard = ({ hour, minute } = {}) => {
    hour = ((hour + 11) % 12) + 1;
    const amPm = hour > 11 ? "pm" : "am";
    return hour + ":" + minute + amPm;
  };

  return (
    <Draggable draggableId={order.id} index={index}>
      {(
        provided
        // snapshot
      ) => (
        <CardContainer
          {...provided.draggableProps}
          theme={theme}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          // isDragging={snapshot.isDragging}
        >
          <OrderDetailContainer>
            {/*ONLY SHOWN IN MOBILE  */}
            <IconContainer title="true">
              <FastfoodIcon disabled className={classes.root} />
              <IconSpace> {order.id} </IconSpace>
            </IconContainer>

            <IconContainer title="true">
              <AccessAlarmsIcon
                disabled //Overwrite the css that is written within the button
                className={classes.root}
              />
              <IconSpace>{convertMiltaryTimeToStandard(order.time)}</IconSpace>
            </IconContainer>
            <IconContainer title="false">
              <LocationOnIcon
                disabled //Overwrite the css that is written within the button
                className={classesAddress.root}
              />
              <IconSpace address="true"> {order.address}</IconSpace>
            </IconContainer>
            <IconContainer title="false">
              <DateRangeIcon
                disabled //Overwrite the css that is written within the button
                className={classes.root}
              />
              <IconSpace> {order.date}</IconSpace>
            </IconContainer>
          </OrderDetailContainer>

          <WhiteSideBarContainer theme={theme}>
            <OrderNumberContainer>
              <OrderTitle>Order</OrderTitle>
              <OrderNumber>{order.id}</OrderNumber>
              {delete_mark ? (
                <XMarkContainer>
                  <XmarkModalButton
                    order_to_delete={{
                      orderid: order.id,
                      driverid: order.livesInColumn,
                      drivername: order.livesInNameColumn,
                    }}
                  />
                </XMarkContainer>
              ) : (
                <div />
              )}
            </OrderNumberContainer>
          </WhiteSideBarContainer>
        </CardContainer>
      )}
    </Draggable>
  );
};

export default Order;
