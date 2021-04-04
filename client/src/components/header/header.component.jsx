import React from "react";
import "./header.styles.scss";
import img from "./logo.png";

const Header = () => {
  return (
    <div className="header">
      <img alt="logo" className="header__img" src={img} />
    </div>
  );
};

export default Header;
