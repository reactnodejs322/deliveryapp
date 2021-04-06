import React from "react";
import Button from "@material-ui/core/Button";
import "./store-item.styles.scss";
import { connect } from "react-redux";

import { setConnectedStore } from "../../redux/stores/stores.action";
import { socketInitStore } from "../../redux/socket/socket.action";
export const StoreItem = ({
  storeInfo,
  setConnectedStore,
  socketInitStore,
}) => {
  return (
    <div className="storeitem">
      {/* <div className="storeitem storeitem--text"></div> */}
      <Button
        onClick={() => {
          setConnectedStore(storeInfo);
          socketInitStore(storeInfo);
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
  socketInitStore: (info) => dispatch(socketInitStore(info)),
});

export default connect(null, mapDispatchToProps)(StoreItem);
