import io from "socket.io-client";
export function Connect_To_Socket_With_StoreName({ storename }) {
  //https://stackoverflow.com/questions/50639337/can%C2%B4t-resolve-react-socket-io-cors-error
  const socket = io(process.env.REACT_APP_endpoint, {
    transports: ["websocket", "polling", "flashsocket"],
  });
  return new Promise((resolve, reject) => {
    socket.on("connect", (data) => {
      resolve(socket);
      socket.emit("new-user", {
        id: "mission-control",
        room: storename,
        ms: true,
      });
    });
  });
}
