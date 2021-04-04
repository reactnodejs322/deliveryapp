import React, { useState } from "react";
import io from "socket.io-client";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
/*
cors error 
https://stackoverflow.com/questions/50639337/can%C2%B4t-resolve-react-socket-io-cors-error
*/
const GenerateUser = ({ id, socketStoreName }) => {
  const [sockets, setSockets] = useState({});
  const newuser = (number) => {
    if (Object.keys(sockets).length === 0) {
      const socket = io(process.env.REACT_APP_endpoint, {
        transports: ["websocket", "polling", "flashsocket"],
      });
      const conv = sockets;
      conv[number] = socket;
      setSockets(conv);
      socket.on("connect", () => {
        socket.emit("new-user", {
          id: number,
          room: `${socketStoreName}`,
          MS: false,
        });
      });
    } else {
      if (sockets[number]) {
        sockets[number].disconnect();
        delete sockets[number];
      } else {
        const socket = io(process.env.REACT_APP_endpoint);
        const conv = sockets;
        conv[number] = socket;
        setSockets(conv);
        socket.on("connect", () => {
          socket.emit("new-user", {
            id: number,
            room: `${socketStoreName}`,
            MS: false,
          });
        });
      }
    }
  };
  return (
    <Button
      style={{
        marginLeft: "3vh",
        margin: 0,
        marginRight: 10,
        fontSize: 9,
        padding: 2,
      }}
      variant="outlined"
      color="inherit"
      onClick={() => newuser(id)}
    >
      Generate User {`${id}`}
    </Button>
  );
};

const mapStateToProps = (state) => ({
  socketStoreName: state.socket.socketStoreName.name,
});

export default connect(mapStateToProps, null)(GenerateUser);
