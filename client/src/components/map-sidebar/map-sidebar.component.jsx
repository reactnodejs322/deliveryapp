import React from "react";

import { connect } from "react-redux";
import "./map-sidebar.styles.scss";
//Actions
import {
  OrdersSocketOn,
  OrdersSocketOff,
} from "../../redux/orders/orders.action";
import { ClearActiveDriver } from "../../redux/drivers/drivers.action";
import { SocketOff } from "../../redux/socket/socket.action";
//Components
import GenerateUser from "../../components-test/generateuser.component";
// import SimUserMove from "../../components-test/move-user.component";
import Button from "@material-ui/core/Button";
import Map from "../map/map.component";
import StoreList from "../store-list/store-list.component";
import Orders from "../orders/orders.component";
//Assets
import arrow from "./arrow.png";
import DynamicDriverList from "../dynamic-driverlist/dynamic-driverlist.component";
/*
MapSideBar functionality
Renders: Map componenet always 
Renders components conditionally based on when the store buttons are clicked and the arrow button:
StoreList: conditionally
Dynamic Driver: conditionally
Orders: conditionally
*/
const MapSideBar = ({
  socket,
  showorders,
  SocketOff,
  ClearActiveDriver,
  OrdersSocketOn,
  OrdersSocketOff,
}) => {
  return (
    <div className="map-side-container">
      <Map />
      {/* 
       If Manager does click a store then socket=true  then dynamic driver loads with showorders being false
       */}
      {socket ? (
        <div className="sidebar-container">
          <div className={showorders ? "side-bar-expanded " : "side-bar"}>
            <div className="disconnect-container">
              <GenerateUser id={3533} />
              <GenerateUser id={4545} />
              <GenerateUser id={5679} />
              {/* <SimUserMove id={5556} /> */}
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  SocketOff(false);
                  ClearActiveDriver();
                }}
              >
                Disconnect
              </Button>
            </div>
            {/*If Manager clicks the arrow then showorders is true then Order Component renders */}
            {showorders ? <Orders /> : <DynamicDriverList />}
          </div>
          {showorders ? (
            <img
              src={arrow}
              alt="expanded-arrow"
              onClick={() => {
                OrdersSocketOff();
              }}
              className="arrow-expanded"
            />
          ) : (
            <img
              src={arrow}
              alt="arrow"
              onClick={() => {
                OrdersSocketOn();
              }}
              className="arrow"
            />
          )}
        </div>
      ) : (
        //If Manager does not click store socket=false then  StoreList component renders
        <div className="side-bar">
          <StoreList />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  socket: state.socket.socketToggle,
  showorders: state.orders.showorders,
});

const mapDispatchToProps = (dispatch) => ({
  OrdersSocketOn: () => dispatch(OrdersSocketOn()),
  OrdersSocketOff: () => dispatch(OrdersSocketOff()),
  SocketOff: (bool) => dispatch(SocketOff(bool)),
  ClearActiveDriver: () => dispatch(ClearActiveDriver()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapSideBar);
