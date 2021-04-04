import React from "react";
//Marker
//useEffect
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { connect } from "react-redux";

import "./map.styles.scss";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map = ({ store, ActiveMovingDriver }) => {
  console.log(process.env.REACT_APP_MAP);
  return (
    <div className="googlemap">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={store.location}
          zoom={15}
        >
          {ActiveMovingDriver.map((element, index) => (
            <div key={index}>
              {element.latitude ? (
                <Marker
                  key={element.employeeId}
                  label={element.firstName}
                  position={{
                    lat: element.latitude,
                    lng: element.longitude,
                  }}
                />
              ) : null}
            </div>
          ))}
          {/* {driverMarkers ? driverMarkers : null} */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

const mapStateToProps = (state) => ({
  store: state.stores.connectedStore,
  ActiveMovingDriver: state.drivers.ActiveMovingDriver,
});

export default connect(mapStateToProps, null)(Map);
