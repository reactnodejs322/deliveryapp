import React from "react";
import "./dynamic-driverlist.styles.scss";
import DynamicDriver from "../dynamic-driver/dynamic-driver.componet";
import { connect } from "react-redux";

const DynamicDriverList = ({ currentDrivers }) => {
  return (
    <div className="drivers-container">
      {currentDrivers ? (
        <div className="drivers-flex">
          {currentDrivers.map((element, index) => (
            <DynamicDriver key={index} userinfo={element} />
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentDrivers: state.drivers.currentDrivers,
});

export default connect(mapStateToProps, null)(DynamicDriverList);
