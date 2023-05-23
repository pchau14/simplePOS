import {LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from "../actions/types";

const token = localStorage.getItem('token');

const initialState = token ? {isAuth: true, token} : {isAuth: false, token: null};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                token: payload.token,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isAuth: false,
                token: null,
            };
        case LOGOUT:
            return {
                ...state,
                isAuth: false,
                token: null,
            };
        default:
            return state;
    }
}