import { all, call, put, take, takeLatest } from "redux-saga/effects";
import UserActionTypes from "../user/user.types";
import { goToPrevPage, goToNextPage } from "./tutorial.action";

// We want to call listeners here

export function* tutorialSagas() {
  yield all([call(listenToUser), call(clickTheButton)]);
}

// Function below is taking an action from user.types to listen

export function* listenToUser() {
  yield [take(UserActionTypes.SIGN_IN_SUCCESS)];
}

// After cliking we need to run action GO_TO_NEXT with function wich go to the next item of array (WTF NOT WORKING)

export function* clickTheButton() {
  yield takeLatest("MOVE_TROUGH_THE_ARRAY", addNewPathToState);
}

// Created array with paths for test
export const pathArray = [
  "/missioncontrol",
  "/settings",
  "/new",
  "/anotherone",
];

// We start from first element and after first click should move to the next element
let indexOfItem = 0;

// Function generator to move to the next element of the array

function* nextPath() {
  let newIndex = indexOfItem++;
  console.log(`${newIndex} from nextPath`);
  while (newIndex < pathArray.length) yield pathArray[newIndex++];
}

// Function generator to move to the previous element of the array (Doesn't work correctly))

function* prevPath() {
  let newIndex = indexOfItem--;
  console.log(`${newIndex} from prevPath`);
  while (newIndex < pathArray.length) yield pathArray[newIndex];
}

// We added path to the next page to tutorial.state using put() effect, because we want to pass it to the tutorial component

export function* addNewPathToState() {
  // Run both generators to generate paths for Prev and Next buttons
  let next = nextPath();
  let prev = prevPath();
  console.log(next.next().value);
  console.log(prev.next().value);

  // Pass paths to state (Why next() is undefined)
  yield all([
    put(goToPrevPage(prev.next().value)),
    put(goToNextPage(next.next().value)),
  ]);
}
