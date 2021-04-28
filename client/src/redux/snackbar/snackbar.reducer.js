import snackbarActionTypes from "./snackbar.types";

const INITIAL_MESSAGE = {
  snackbarOpen: false,
  snackbarType: "",
  snackbarMessage: "",
};

const snackbarReducer = (state = INITIAL_MESSAGE, action) => {
  switch (action.type) {
    case snackbarActionTypes.SET_SNACKBAR:
      const { snackbarOpen, snackbarType, snackbarMessage } = action.payload;
      return { ...state, snackbarOpen, snackbarType, snackbarMessage };
    case snackbarActionTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarOpen: action.payload,
        snackbarMessage: "",
        snackbarActionTypes: "",
      };
    default:
      return state;
  }
};

export default snackbarReducer;
