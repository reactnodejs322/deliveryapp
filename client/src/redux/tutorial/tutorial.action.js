import { tutorialTypes } from "./tutorial.types";

export function hiddingTutorial() {
  return {
    type: tutorialTypes.IS_HIDDING,
  };
}

export function moveTroughTheArray() {
  return {
    type: tutorialTypes.MOVE_TROUGH_THE_ARRAY,
  };
}

export function goToPrevPage(newState) {
  return {
    type: tutorialTypes.GO_TO_PREV,
    payload: newState,
  };
}

export function goToNextPage(newState) {
  return {
    type: tutorialTypes.GO_TO_NEXT,
    payload: newState,
  };
}
