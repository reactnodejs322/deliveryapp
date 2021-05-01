import React from "react";
import "./googlebutton.styles.scss";
import googleimg from "./google.png";
export const GoogleButton = ({ ...props }) => {
  return (
    <div className="googlebutton" {...props}>
      <img src={googleimg} alt="googleimg" />
      <div>Sign in with Google</div>
      <div></div>
    </div>
  );
};

export default GoogleButton;
