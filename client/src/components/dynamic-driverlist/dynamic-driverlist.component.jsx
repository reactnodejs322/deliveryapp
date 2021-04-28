import React, { useEffect } from "react";
import "./dynamic-driverlist.styles.scss";
import DynamicDriver from "../dynamic-driver/dynamic-driver.componet";
import { connect } from "react-redux";
import { setSnackbar } from "../../redux/snackbar/snackbar.action";
import axios from "axios";

const DynamicDriverList = ({
  currentDrivers,
  dissconnectedUser,
  setSnackbar,
}) => {
  useEffect(() => {
    axios
      .get(`/api/users/${dissconnectedUser}`)
      .then((res) => {
        const { firstName, lastName } = res.data;
        setSnackbar(true, "error", `${firstName} ${lastName} is dissconnected`);
      })
      .catch((error) => console.log(error.message));
    console.log(dissconnectedUser);
  }, [dissconnectedUser]);
  return (
    <div className='drivers-container'>
      {currentDrivers ? (
        <div className='drivers-flex'>
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
  dissconnectedUser: state.drivers.disconnectedDriver,
});
const mapDispatchToProps = (dispatch) => ({
  setSnackbar: (snackbarOpen, snackbarType, snackbarMessage) =>
    dispatch(setSnackbar(snackbarOpen, snackbarType, snackbarMessage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DynamicDriverList);
