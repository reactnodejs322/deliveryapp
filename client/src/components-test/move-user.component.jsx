import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Button from "@material-ui/core/Button";
/*
Test component that takes @params  id 
Description: Simulates a driver moving
*/
const SimUserMove = ({ id }) => {
  const [socket, setSocket] = useState();
  const [connected, setConnected] = useState(true);
  const [userexist, setUserexist] = useState(true);
  const [position, setPosition] = useState({
    coords: {
      accuracy: 65,
      altitude: 210.50143432617188,
      altitudeAccuracy: 10,
      heading: -1,
      latitude: 26.259,
      longitude: -80.27,
      speed: -1,
    },
    timestamp: 1610579477507.111,
  });
  // to get prevstate, see line 58 to explain why we get prevposition
  function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();

    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }
  //see line 58 to explain why we get prevposition
  const prevPosition = usePrevious(position);
  useEffect(() => {
    // If a socket is defined  then emit to the server
    if (socket) {
      socket.on("connect", () => {
        // i just want one user
        if (userexist) {
          socket.emit("new-user", {
            id: id,
            room: "Royal Palm",
            MS: false,
          });
          setUserexist(false);
        }

        socket.emit("position", position, id, "Royal Palm");
      });
    }
    /*
    We want this useEffect to trigger when a position is changed
    Also we dont want to recreate another socket to create a user
    So this conditional statement will deliever that purpose
    if a user exist  and a position is changed 
    then do the following... emit a position...
    */
    if (userexist === false && prevPosition !== position) {
      socket.emit("position", position, id, "Royal Palm");
    }

    return () => {};
  }, [socket, userexist, position, prevPosition, id]);

  const newuser = () => {
    //So it doesn't create a new socket
    if (connected) {
      const socket = io(process.env.REACT_APP_endpoint);
      setSocket(socket);
      setConnected(false);
    }

    //  if a user exist
    //  then set the position only when the button is clicked
    //  this conditionall statement is decieving but you can think of it that
    //  way (:
    if (userexist === false) {
      setPosition({
        coords: {
          accuracy: 65,
          altitude: 210.50143432617188,
          altitudeAccuracy: 10,
          heading: -1,
          latitude: position.coords.latitude + 0.0001,
          longitude: -80.27,
          speed: -1,
        },
        timestamp: 1610579477507.111,
      });
    }
  };
  return (
    <Button
      style={{ fontSize: 9, padding: 2, marginLeft: "3vh", marginRight: "3vh" }}
      variant="outlined"
      color="inherit"
      onClick={() => newuser()}
    >
      Move User {id}
    </Button>
  );
};

export default SimUserMove;
