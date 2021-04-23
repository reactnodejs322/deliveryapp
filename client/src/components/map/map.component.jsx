import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "./map.styles.scss";
import { connect } from "react-redux";

const containerStyle = {
  width: "100%",
  height: "95vh",
};
// You should refactor stuff here man
const Map = ({
  store,
  ActiveMovingDriver,
  apiorders,
  updated_status_order,
}) => {
  //for when you click on an order
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [infoOpen, setInfoOpen] = useState(false);
  
  useEffect(() => {
    setSelectedPlace(updated_status_order);
  }, [updated_status_order]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_google_map_api,
  });

  const markerLoadHandler = (marker, place) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [place.orderNumber]: marker };
    });
  };
  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);
  };

  const renderMap = () => {
    const { maps } = window.google;

    return (
      <div>
        <GoogleMap
          center={store.location}
          zoom={13}
          mapContainerStyle={containerStyle}
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

          {apiorders.length > 0 ? (
            <div>
              {apiorders.map((order, index) => (
                <Marker
                  key={order.orderNumber}
                  label={{
                    className: "marktest",
                    text: `${order.orderNumber}`,
                    color: `${order.status === "on_route" ? "cyan" : "white"} `,

                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                  onLoad={(marker) => markerLoadHandler(marker, order)}
                  onClick={(event) => markerClickHandler(event, order)}
                  icon={{
                    url:
                      "https://pictures-logo.s3.amazonaws.com/restaurant.svg",
                    labelOrigin: new maps.Point(20, -10),
                    scaledSize: new maps.Size(40, 40),
                  }}
                  position={{
                    lat: order.geocode.lat,
                    lng: order.geocode.lng,
                  }}
                />
              ))}
              {infoOpen && selectedPlace && (
                <InfoWindow
                  anchor={markerMap[selectedPlace.orderNumber]}
                  onCloseClick={() => setInfoOpen(false)}
                >
                  <div
                    style={{
                      outline: "none",
                      width: "300px",
                      wordBreak: "break-word",
                      textAlign: "center",
                    }}
                  >
                    <h2 style={{ color: "black" }}>
                      Order: {selectedPlace.orderNumber}
                    </h2>
                    <h3 style={{ color: "black" }}>
                      Status: {selectedPlace.status}
                    </h3>
                    <div style={{ color: "black" }}>
                      {selectedPlace.address}
                    </div>
                    <div style={{ color: "black" }}>
                      date: {selectedPlace.date}
                    </div>
                    <div style={{ color: "black" }}>
                      phone: {selectedPlace.phone}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </div>
          ) : null}
        </GoogleMap>
      </div>
    );
  };

  return isLoaded ? renderMap() : <div>Loading</div>;
};

const mapStateToProps = (state) => ({
  store: state.stores.connectedStore,
  ActiveMovingDriver: state.drivers.ActiveMovingDriver,
  apiorders: state.orders.apiorders,
  updated_status_order: state.orders.updated_status_order,
});
export default connect(mapStateToProps, null)(Map);
