import React, { useEffect } from "react";

import { connect } from "react-redux";

import MultipleSnackBar from "../custom-snackbar/multiple-snackbar.component";
import Display from "./display.component";
import { clearDisconnectSnackbar } from "../../redux/drivers/drivers.action";
//You must make sure props start of as undefined or null

export const Snackbar = ({ disconnect_snackbar, clearDisconnectSnackbar }) => {
  console.log(disconnect_snackbar);
  /*
  By traversing through different pages clearing the snackbar and going back to the page wont show
  the snackbar again unless it's being triggered again
  */
  useEffect(() => {
    return () => {
      clearDisconnectSnackbar();
    };
  }, [clearDisconnectSnackbar]);

  //it just needs to go back to undefined again
  return (
    <div>
      <MultipleSnackBar
        maxSnack={2}
        autoHideDuration={3000}
        changeTrigger={disconnect_snackbar}
      >
        <Display disconnect_snackbar={disconnect_snackbar} />
      </MultipleSnackBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  disconnect_snackbar: state.drivers.disconnect_snackbar,
});

const mapDispatchToProps = (dispatch) => ({
  clearDisconnectSnackbar: () => dispatch(clearDisconnectSnackbar()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
