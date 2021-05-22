import React from "react";
import CustomSnackbar from "./custom-snackbar.component";
import AddSnack from "./addsnack.component";
const MultipleSnackBar = ({
  maxSnack,
  autoHideDuration,
  changeTrigger,
  children,
}) => {
  return (
    <AddSnack changeTrigger={changeTrigger}>
      <CustomSnackbar
        maxSnack={maxSnack}
        autoHideDuration={autoHideDuration}
        changeTrigger={changeTrigger}
      >
        {children}
      </CustomSnackbar>
    </AddSnack>
  );
};

export default MultipleSnackBar;
