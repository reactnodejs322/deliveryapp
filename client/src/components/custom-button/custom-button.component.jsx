import React from "react";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

export const CustomButtonStyles = makeStyles({
  root: {
    color: ({ color }) => (color ? color : "white"),
    margin: ({ margin }) => (margin ? margin : ""),
    width: ({ width }) => (width ? width : ""),

    height: ({ height }) => (height ? height : ""),
  },
  label: {
    color: ({ color }) => (color ? color : "white"),
  },
});

export const CustomButton = ({
  children,
  color,
  margin,
  width,
  height,
  onClickFunctionProp = () => {
    // console.error(
    //   "You did not pass onClickFunctionProp to \n\n\tCustomButton Component"
    // );
  },
  ...props
}) => {
  // console.log(onClickFunctionProp);

  const classes = CustomButtonStyles({
    color: color,
    margin: margin,
    width: width,
    height: height,
  });
  return (
    <Button
      onClick={() => onClickFunctionProp()}
      variant="outlined"
      color="inherit"
      classes={classes}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
