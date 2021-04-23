import StoresActionTypes from "./stores.types";

const INITIAL_STATE = {
  stores: [],
  //by default we start a Royal Palm
  connectedStore: {
    location: { lat: 26.260501899508107, lng: -80.26398159301463 },
    name: "Royal Palm",
    number: 1,
    users: [],
    __v: 0,
    _id: "5ff3e0bdd756ce68b0b848be",
  },
};

const storesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case StoresActionTypes.PUT_STORES_IN_STATE:
      return {
        ...state,
        stores: action.payload,
      };
    case StoresActionTypes.CONNECTED_STORE:
      return {
        ...state,
        connectedStore: action.payload,
      };

    default:
      return state;
  }
};

export default storesReducer;
