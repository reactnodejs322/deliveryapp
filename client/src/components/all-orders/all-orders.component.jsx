import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../redux/orders/orders.utils";
import OrderCard from "../order-card/order-card.component";
import { socketSendOrderUpdate } from "../../redux/orders/orders.action";
import { connect } from "react-redux";
import "./all-order.styles.scss";
const AllApiOrders = ({ socketSendOrderUpdate }) => {
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

  return (
    <div className="all-api-orders-container">
      {api_orders.length
        ? api_orders.map((order, index) => (
            <OrderCard
              key={index}
              order={order}
              changeAllApiOrderState={changeAllApiOrderState}
              socketSendOrderUpdate={socketSendOrderUpdate}
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
