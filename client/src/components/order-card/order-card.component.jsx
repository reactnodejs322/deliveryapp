import React from "react";

import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DateRangeIcon from "@material-ui/icons/DateRange";
import FastfoodIcon from "@material-ui/icons/Fastfood";

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
} from "./order-card.styles";

//Change Card height here
export const theme = {
  height: "130px",
};

const OrderCard = ({
  order = {},
  socketSendOrderUpdate,
  changeAllApiOrderState,
  ...props
}) => {
  const classes = useIconStyles();
  const classesAddress = useIconAddressStyles();
  const convertMiltaryTimeToStandard = ({ hour, minute } = {}) => {
    if (hour === undefined && minute === undefined) {
      console.log(hour);
      console.log(minute);
      return "";
    }
    hour = ((hour + 11) % 12) + 1;
    const amPm = hour > 11 ? "pm" : "am";
    return hour + ":" + minute + amPm;
  };

  return (
    <CardContainer theme={theme}>
      <OrderDetailContainer>
        {/*ONLY SHOWN IN MOBILE  */}
        <IconContainer title="true">
          <FastfoodIcon disabled className={classes.root} />
          <IconSpace> {order.orderNumber} </IconSpace>
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
          <OrderNumber>{order.orderNumber}</OrderNumber>
          {/* you should make this resuable somehow here */}
          <XMarkContainer
            onClick={() => {
              socketSendOrderUpdate(order);
              changeAllApiOrderState(order);
            }}
          >
            ✅
          </XMarkContainer>
        </OrderNumberContainer>
      </WhiteSideBarContainer>
    </CardContainer>
  );
};

export default OrderCard;
