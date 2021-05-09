import React, { createContext } from "react";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
const Sneakbar = () => {
  const classes = useStyles();
  const SetSnackbar = createContext({
    open: false,
  });
  const handleClose = () => {
    setOpenState(false);
  };
  const style = color === "alert" ? "red" : "green";

  return (
    <SetSnackbar.Consumer>
      <div className={classes.root}>
        <Snackbar
          style={{ backgroundColor: `${style}` }}
          open={openState}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            color={colorState}
          >
            {messageState}
          </Alert>
        </Snackbar>
      </div>
    </SetSnackbar.Consumer>
  );
};

export default Sneakbar;
