import DriversActionTypes from "./drivers.types";

const INITIAL_STATE = {
  ActiveMovingDriver: [],
  currentDrivers: [],
  justadded: undefined,
  disconnectedDriver: undefined,
  disconnectTrigger: false,
  position: {},
  show_drivers_or_stores_panel: false,
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
      let justadded = {};
      if (state.currentDrivers) {
        if (state.currentDrivers.length === 0) {
          justadded = action.payload[0];
        } else {
          justadded = action.payload[action.payload.length - 1];
        }
      }

      return {
        ...state,
        currentDrivers: action.payload,
        justadded: justadded,
      };

    case DriversActionTypes.REMOVE_ACTIVE_DRIVER:
      return {
        ...state,

        currentDrivers: state.currentDrivers.filter(
          (driver) => driver.employeeId !== action.payload
        ),
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
