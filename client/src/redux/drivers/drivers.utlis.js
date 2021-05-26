//function and bussiness logic go here

import { eventChannel } from "redux-saga";
import {
  currentConnectedDriver,
  removeActiveDriver,
  setActiveDriverPosition,
} from "./drivers.action";

export function socketDriverOn(socket) {
  return eventChannel((emit) => {
    socket.on("current-users", (data) => {
      try {
        if (!data.manager) emit(currentConnectedDriver(data));
      } catch (err) {
        console.log(
          "A promise has failed to request to the API within PromisesRequest Array "
        );
      }
    });
    //most intensive

    socket.on("d-position", (position) => {
      emit(setActiveDriverPosition(position));
    });
    socket.on("disconnected-users", (data) => {
      emit(removeActiveDriver(data));
    });
    socket.on("disconnect", (e) => {
      console.log("Socket driver", e);
    });
    return () => {
      socket.disconnect();
    };
  });
}

export function disconnect(socket) {
  socket.disconnect();
}
