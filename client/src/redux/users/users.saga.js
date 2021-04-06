import { all, call, put, takeLatest } from "redux-saga/effects";
import UsersActionTypes from "./users.types";
import axios from "axios";
import { putUsers } from "./users.action";
const SignUp = (input) => {
    return axios.post('/api/users', {
        ...input
    })
};

export function* SetUsers({ input }) {
    try {
        const users = yield call(SignUp(input));

        yield put(putUsers(users));
    } catch (error) {
        console.log("Request to storeApi Failed!");
    }
}

export function* listenSignUp() {
    yield takeLatest(UsersActionTypes.REGISTER_USER, SetUsers);
}

export function* usersSagas() {
    yield all([call(listenSignUp)]);
}