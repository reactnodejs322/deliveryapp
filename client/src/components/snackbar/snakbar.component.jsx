import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { closeSnackbar } from "../../redux/snackbar/snackbar.action";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomizedSnackbars = ({
  snackbarMessage,
  snackbarOpen,
  snackbarType,
  closeSnackbar,
}) => {
  const classes = useStyles();
  const handleClose = (event) => {
    closeSnackbar(false);
    console.log(snackbarMessage, snackbarOpen, snackbarType);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          style={{ width: "100%" }}
          elevation={6}
          variant='filled'
          onClose={handleClose}
          color={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = ({ snackbar }) => ({
  snackbarOpen: snackbar.snackbarOpen,
  snackbarType: snackbar.snackbarType,
  snackbarMessage: snackbar.snackbarMessage,
});

const mapDispatchToProps = (dispatch) => ({
  closeSnackbar: (snackbarOpen) => dispatch(closeSnackbar(snackbarOpen)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizedSnackbars);
