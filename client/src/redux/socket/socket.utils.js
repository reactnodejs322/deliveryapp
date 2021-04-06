import io from "socket.io-client";
export function Connect_To_Socket_With_StoreId({ storeId }) {
  const socket = io(process.env.REACT_APP_endpoint);
  return new Promise((resolve, reject) => {
    socket.on("connect", (data) => {
      resolve(socket);
      socket.emit("new-user", {
        store: storeId,
        id: 3533,
        role: "manager",
        // get storeId from get request in DATABASE get user from id from CREDENTIALS
      });
    });
  });
}
