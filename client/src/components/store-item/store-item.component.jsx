import React from "react";
import Button from "@material-ui/core/Button";
import "./store-item.styles.scss";
import { connect } from "react-redux";

import { setConnectedStore } from "../../redux/stores/stores.action";

import { showDriverPanel } from "../../redux/drivers/drivers.action";
export const StoreItem = ({
  storeInfo,
  setConnectedStore,
  showDriverPanel,
}) => {
  return (
    <div className="storeitem">
      {/* <div className="storeitem storeitem--text"></div> */}
      <Button
        onClick={() => {
          //for google map to display the area
          setConnectedStore(storeInfo);
          showDriverPanel();
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
  //for google map to display the area
  setConnectedStore: (info) => dispatch(setConnectedStore(info)),

  // to turn the store button panel into driver panel
  showDriverPanel: () => dispatch(showDriverPanel()),
});

export default connect(null, mapDispatchToProps)(StoreItem);
