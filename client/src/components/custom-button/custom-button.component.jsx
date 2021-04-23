import React from "react";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

export const CustomButtonStyles = makeStyles({
  root: {
    color: (props) => (props.color ? props.color : "white"),
    margin: (props) => (props.margin ? props.margin : ""),
  },
  label: {
    color: (props) => (props.color ? props.color : "white"),
  },
});

export const CustomButton = ({
  children,
  color,
  margin,
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
