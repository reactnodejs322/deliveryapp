import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../redux/orders/orders.utils";
import OrderCard from "../order-card/order-card.component";
import { socketSendOrderUpdate } from "../../redux/orders/orders.action";
import { connect } from "react-redux";
import "./all-order.styles.scss";
const AllApiOrders = ({ socketSendOrderUpdate }) => {
  //doint it
  const [api_orders, setApiOrders] = useState({});

  useEffect(() => {
    fetchOrders().then((data) => {
      setApiOrders(data);
    });
  }, []);

  const changeAllApiOrderState = (chosen_completed_order) => {
    setApiOrders(
      api_orders.filter((order) => order !== chosen_completed_order)
    );
  };
  const orderFromChild = (order_from_child) => {
    changeAllApiOrderState(order_from_child);
    socketSendOrderUpdate(order_from_child);
  };
  return (
    <div className="all-api-orders-container">
      {api_orders.length
        ? api_orders.map((order, index) => (
            <OrderCard
              key={index}
              order={order}
              onClickFunctions={orderFromChild}
            />
          ))
        : null}
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  socketSendOrderUpdate: (Order) => dispatch(socketSendOrderUpdate(Order)),
});

export default connect(null, mapDispatchToProps)(AllApiOrders);
