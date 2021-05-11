import tutorialTypes from "./tutorial.types";

let INITIAL_STATE = {
  hidden: false,
  prevPath: "",
  nextPath: "",
};

const tutorialReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case tutorialTypes.IS_HIDDING:
      console.log(state);
      return {
        ...state,
        hidden: !state.hidden,
      };

    case tutorialTypes.GO_TO_PREV:
      return {
        ...state,
        prevPath: action.payload,
      };

    case tutorialTypes.GO_TO_NEXT:
      return {
        ...state,
        nextPath: action.payload,
      };

    default:
      return state;
  }
};

export default tutorialReducer;
