import UsersActionTypes from "./users.types";

const INITIAL_STATE = {
    users: [],
    //default user
    connectedUser: {
        firstName: "Andrija",
        lastName: "Gajic",
        employeeId: 1234,
        role: "manager",
        __v: 0,
        _id: "5ff3e0bdd756ce68b0b848be",
    },
};

const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UsersActionTypes.REGISTER_USER:
            return {
                ...state,
                users: action.payload,
            };
        case UsersActionTypes.LOG_IN_USER:
            return {
                ...state,
                users: action.payload,
            };
        case UsersActionTypes.DISCONNECT_USER:
            return {
                ...state,
                users: action.payload
            }

        default:
            return state;
    }
};

export default usersReducer; 