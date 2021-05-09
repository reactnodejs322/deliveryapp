import React from "react";
import Button from "@material-ui/core/Button";

import { Theme, makeStyles } from "@material-ui/core";
//? refers to it can be undefined
interface CustomButtonProps {
  //https://www.carlrippon.com/react-children-with-typescript/
  children: JSX.Element | JSX.Element[] | string | string[];
  color?: string;
  margin?: string;
  width?: string;
  height?: string;
  onClickFunctionProp?: () => void;
  [x: string]: any; //otherprops
}
interface CustomButtonStylesProps {
  color?: string;
  margin?: string;
  width?: string;
  height?: string;
}
export const CustomButtonStyles = makeStyles<Theme, CustomButtonStylesProps>({
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

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  color,
  margin,
  width,
  height,
  onClickFunctionProp = () => {},
  ...props
}) => {
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
