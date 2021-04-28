import snackbarActionTypes from "./snackbar.types";

export const setSnackbar = (snackbarOpen, snackbarType, snackbarMessage) => ({
  type: snackbarActionTypes.SET_SNACKBAR,
  payload: { snackbarOpen, snackbarType, snackbarMessage },
});

export const closeSnackbar = (param) => ({
  type: snackbarActionTypes.CLOSE_SNACKBAR,
  payload: param,
});
