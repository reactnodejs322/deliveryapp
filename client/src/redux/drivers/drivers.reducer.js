import DriversActionTypes from "./drivers.types";

const INITIAL_STATE = {
  ActiveMovingDriver: [],
  currentDrivers: [],
  justadded: undefined,
  disconnectedDriver: undefined,
  disconnectTrigger: false,
  position: {},
  show_drivers_or_stores_panel: false,
  disconnect_snackbar: undefined,
};

const driverReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DriversActionTypes.SHOW_DRIVER_PANEL:
      return {
        ...state,
        show_drivers_or_stores_panel: true,
      };
    case DriversActionTypes.SHOW_STORE_PANEL:
      return {
        ...state,
        show_drivers_or_stores_panel: false,
      };

    case DriversActionTypes.CURRENT_CONNECTED_DRIVER:
      //because driver is cached we need to reinput currentDriver
      if (state.currentDrivers === undefined)
        return { ...state, currentDrivers: [action.payload] };

      return {
        ...state,
        currentDrivers: [...state.currentDrivers, action.payload],
        justadded: action.payload,
      };
    case DriversActionTypes.CLEAR_DISCONNECT_SNACKBAR:
      return {
        ...state,
        disconnect_snackbar: undefined,
      };
    case DriversActionTypes.REMOVE_ACTIVE_DRIVER:
      return {
        ...state,
        currentDrivers: state.currentDrivers.filter(
          (driver) => driver.id !== action.payload
        ),
        disconnect_snackbar: {
          disconnectedDriver: action.payload,
          disconnectTrigger: !state.disconnectTrigger,
        },
        disconnectedDriver: action.payload,
        disconnectTrigger: !state.disconnectTrigger,
      };

    case DriversActionTypes.SET_ACTIVE_DRIVER_POSITION:
      //find the index driver with there position
      let index = state.currentDrivers.findIndex(
        (driver) => driver.employeeId === action.payload.id
      );
      // use action.payload.id which is position data to find the driver in current driver
      let Driver = state.currentDrivers[index];

      let ModifiedDriver;

      if (Driver) {
        //Merge Driver and position
        ModifiedDriver = { ...Driver, ...action.payload.position.coords };
      } else {
        return {
          ...state,
        };
      }
      let Activeindex = state.ActiveMovingDriver.findIndex(
        (active) => active.employeeId === action.payload.id
      );
      // if Active driver does not exist  in action.payload
      if (Activeindex === -1) {
        return {
          ...state,
          position: action.payload,
          ActiveMovingDriver: [ModifiedDriver, ...state.ActiveMovingDriver],
        };
      } else {
        //if it does exist  than update their position
        state.ActiveMovingDriver.splice(Activeindex, 1);
        return {
          ...state,
          position: action.payload,
          ActiveMovingDriver: [ModifiedDriver, ...state.ActiveMovingDriver],
        };
      }

    case DriversActionTypes.CLEAR_ACTIVE_DRIVER:
      return {
        ...state,
        ActiveMovingDriver: [],
      };

    default:
      return state;
  }
};

export default driverReducer;
