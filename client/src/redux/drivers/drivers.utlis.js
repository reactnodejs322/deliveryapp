//function and bussiness logic go here
import axios from "axios";

import { eventChannel } from "redux-saga";
import {
  AddActiveDriver,
  RemoveActiveDriver,
  SetActiveDriverPosition,
} from "./drivers.action";

export function socketDriverOn(socket) {
  return eventChannel((emit) => {
    socket.on("current-users", (data) => {
      try {
        // data is an array of number of driver ids [12,13,14]
        // this data is being used for an api request to get the driver's Firstname, Lastname
        const PromisesRequest = ConvertIds(data);
        // since it's an array of promises then after we requestd the data we put them into redux
        Promise.all(PromisesRequest).then((users) => {
          emit(AddActiveDriver(users));
        });
      } catch (err) {
        console.log(
          "A promise has failed to request to the API within PromisesRequest Array "
        );
      }
    });
    //most intensive
    socket.on("d-position", (position, id, store) => {
      position["id"] = id;
      position["store"] = store;

      emit(SetActiveDriverPosition(position));
    });
    socket.on("disconnected-users", (data) => {
      emit(RemoveActiveDriver(data));
    });
    socket.on("disconnect", (e) => {
      console.log(e);
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
