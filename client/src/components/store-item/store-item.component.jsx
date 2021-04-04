import React from "react";
import Button from "@material-ui/core/Button";
import "./store-item.styles.scss";
import { connect } from "react-redux";

import { setConnectedStore } from "../../redux/stores/stores.action";
import { SocketInitStore } from "../../redux/socket/socket.action";
export const StoreItem = ({
  storeInfo,

  setConnectedStore,
  SocketInitStore,
}) => {
  return (
    <div className="storeitem">
      {/* <div className="storeitem storeitem--text"></div> */}
      <Button
        onClick={() => {
          setConnectedStore(storeInfo);
          SocketInitStore(storeInfo);
        }}
        variant="outlined"
        color="inherit"
      >
        {storeInfo.name}
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setConnectedStore: (info) => dispatch(setConnectedStore(info)),
  SocketInitStore: (info) => dispatch(SocketInitStore(info)),
});

export default connect(null, mapDispatchToProps)(StoreItem);
