import React, { useState } from "react";

import { connect } from "react-redux";

import "./map-sidebar.styles.scss";
//Actions
import {
  expandOrderDragDropSideBar,
  compressOrderDragDropSideBar,
} from "../../redux/orders/orders.action";

import {
  clearActiveDriver,
  showStorePanel,
} from "../../redux/drivers/drivers.action";
import { socketOff } from "../../redux/socket/socket.action";
import { DisconnectButtonStyles } from "./map-sidebar.styles";
//Components
import Button from "@material-ui/core/Button";
import DynamicDriverList from "../dynamic-driverlist/dynamic-driverlist.component";
import ArrowModalButton from "../arrow-modal-button/arrow-expanded-modal-button.component";
import Map from "../map/map.component";
import SaveModalButton from "../save-modal-button/save-modal-button.component";

import StoreList from "../store-list/store-list.component";
import Orders from "../drag-drop-orders/orders.component";
import AllApiOrders from "../all-orders/all-orders.component";
//Assets
import arrow from "./arrow.png";

/*
MapSideBar functionality
Renders: Map componenet always 
Renders components conditionally based on when the store buttons are clicked and the arrow button:
StoreList: conditionally
Dynamic Driver: conditionally
Orders: conditionally
*/

export const MapSideBar = ({
  socketOff,
  clearActiveDriver,

  ...props
}) => {
  //state
  const { apiorders, unassigned_orders } = props;

  const {
    showorders,
    expandOrderDragDropSideBar,
    compressOrderDragDropSideBar,
  } = props;

  const { show_drivers_or_stores_panel, showStorePanel } = props;

  const [show_arrow_modal, openArrowModal] = useState(false);

  const [show_all_orders_component, showAllOrders] = useState(false);

  const disconnect_button_classes = DisconnectButtonStyles();
  const handleClose = () => {
    openArrowModal(false);
  };

  const handleOpenArrowModal = () => {
    openArrowModal(true);
  };

  return (
    <div className="map-side-container">
      <Map />
      {/* 
       If Manager does click a store then socket=true  then dynamic driver loads with showorders being false
       */}
      {show_drivers_or_stores_panel ? (
        <div className="sidebar-container">
          {showorders ? (
            <>
              <div className="side-bar-expanded">
                <div className="side-bar-expanded__driverorder-container">
                  {show_all_orders_component ? (
                    <Button
                      variant="outlined"
                      color="inherit"
                      style={{ margin: "10px" }}
                      onClick={() => showAllOrders(false)}
                    >
                      Back
                    </Button>
                  ) : (
                    <>
                      <Button
                        style={{ margin: "10px" }}
                        variant="outlined"
                        color="inherit"
                        onClick={() => showAllOrders(true)}
                      >
                        Manually Complete Orders
                      </Button>
                      <SaveModalButton />
                    </>
                  )}
                </div>

                {[
                  show_all_orders_component ? (
                    <AllApiOrders key={1} />
                  ) : (
                    <Orders key={1} />
                  ),
                ]}
              </div>

              <img
                src={arrow}
                className="arrow-expanded"
                alt="expanded-arrow"
                onClick={() => {
                  apiorders.length === unassigned_orders.length
                    ? compressOrderDragDropSideBar()
                    : handleOpenArrowModal();
                }}
              />
            </>
          ) : (
            <>
              <div className="side-bar">
                <div className="top-container">
                  <Button
                    classes={{
                      label: disconnect_button_classes.label,
                      root: disconnect_button_classes.root,
                    }}
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      socketOff();
                      showStorePanel();
                      clearActiveDriver();
                    }}
                  >
                    Disconnect
                  </Button>
                </div>
                <DynamicDriverList />
              </div>
              <img
                src={arrow}
                alt="arrow"
                onClick={() => {
                  expandOrderDragDropSideBar();
                }}
                className="arrow"
              />
            </>
          )}

          <ArrowModalButton
            show_arrow_modal={show_arrow_modal}
            handleClose={handleClose}
          />
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
  apiorders: state.orders.apiorders,
  unassigned_orders: state.orders.currentdragdrop.columns["column-1"].orderIds,
  show_drivers_or_stores_panel: state.drivers.show_drivers_or_stores_panel,
  showorders: state.orders.showorders,
});

const mapDispatchToProps = (dispatch) => ({
  expandOrderDragDropSideBar: () => dispatch(expandOrderDragDropSideBar()),
  compressOrderDragDropSideBar: () => dispatch(compressOrderDragDropSideBar()),
  socketOff: () => dispatch(socketOff()),
  clearActiveDriver: () => dispatch(clearActiveDriver()),
  showStorePanel: () => dispatch(showStorePanel()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapSideBar);
