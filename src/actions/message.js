import {SET_MESSAGE, CLEAR_MESSAGE} from "./types";

export const setMsg = (message) => ({
    type: SET_MESSAGE,
    payload: message,
});

export const clearMsg = () => ({
    type: CLEAR_MESSAGE,
});