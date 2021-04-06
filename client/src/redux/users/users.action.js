import UsersActionTypes from './users.types'

export const registerUser = (user) => ({
    type: UsersActionTypes.REGISTER_USER,
    payload: user
})

export const loginUser = (user) => ({
    type: UsersActionTypes.LOG_IN_USER,
    payload: user
})

export const disconnectUser = (user) => ({
    type: UsersActionTypes.DISCONNECT_USER,
    payload: user
})

export const putUsers = (user) => ({
    type: UsersActionTypes.DISCONNECT_USER,
    payload: user
})