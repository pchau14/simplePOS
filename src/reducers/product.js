import {
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
    REMOVE_PRODUCT_SUCCESS,
    REMOVE_PRODUCT_FAIL,
    MINUS_ITEM_SUCCESS,
    MINUS_ITEM_FAIL
} from "../actions/types";

const initialState = {isSuccess: false, item: []};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                item: action.payload
            };
        case ADD_PRODUCT_FAIL:
            return {
                ...state,
                isSuccess: false
            };
        case REMOVE_PRODUCT_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                item: action.payload
            };
        case REMOVE_PRODUCT_FAIL:
            return {
                ...state,
                isSuccess: false
            };
        case MINUS_ITEM_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                item: action.payload
            };
        case MINUS_ITEM_FAIL:
            return {
                ...state,
                isSuccess: false
            };
        default:
            return state;
    }
}