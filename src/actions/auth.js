import {LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE} from "./types";
import AuthService from '../api/auth'

export const login = (userdata) => (dispatch) => {
    return AuthService.login(userdata).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {token: data},
            });

            return Promise.resolve();
        },
        (error) => {
            const message = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message || error.toString();

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
};

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
}