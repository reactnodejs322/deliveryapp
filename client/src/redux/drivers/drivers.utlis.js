//function and bussiness logic go here
import axios from "axios";

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
        // data is an array of number of driver ids [12,13,14]
        // this data is being used for an api request to get the driver's Firstname, Lastname
        const PromisesRequest = ConvertIds(
          Object.entries(data.users).reduce((drivers, [id, role]) => {
            if (role === "driver") {
              drivers.push(id);
            }
            return drivers;
          }, [])
        );

        // since it's an array of promises then after we requestd the data we put them into redux
        Promise.all(PromisesRequest).then((drivers) => {
          emit(currentConnectedDriver(drivers));
        });
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

export const getUser = (driverId) => {
  var CancelToken = axios.CancelToken;
  var { token } = CancelToken.source();
  return axios
    .get(`/api/users/${driverId}`, { cancelToken: token })
    .then((res) => res.data);
};
export const ConvertIds = (UseridArray) => {
  let GetUserPromises = [];
  UseridArray.forEach((id) => {
    GetUserPromises.push(getUser(id));
  });
  return GetUserPromises;
};
export function disconnect(socket) {
  socket.disconnect();
}
