import {
    GET_CUSTOMER_SUCCESS,
    GET_CUSTOMER_FAIL,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    GEN_TOKEN_SUCCESS,
    GEN_TOKEN_FAIL,
    CRT_CART_SUCCESS,
    CRT_CART_FAIL,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAIL
} from "../actions/types";

const initialState = {
    customers: [],
    products: [],
    isToken: false,
    cartId: null,
    items: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CUSTOMER_SUCCESS:
            return {
                ...state,
                customers: action.payload
            };
        case GET_CUSTOMER_FAIL:
            return {
                ...state,
                customers: null
            };
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload
            };
        case GET_PRODUCTS_FAIL:
            return {
                ...state,
                products: null
            };
        case GEN_TOKEN_SUCCESS:
            return {
                ...state,
                isToken:  true
            };
        case GEN_TOKEN_FAIL:
            return {
                ...state,
                isToken: false
            };
        case CRT_CART_SUCCESS:
            return {
                ...state,
                cartId: true
            };
        case CRT_CART_FAIL:
            return {
                ...state,
                cartId: false
            };
        case GET_ITEMS_SUCCESS:
            return {
                ...state,
                items: action.payload
            };
        case GET_ITEMS_FAIL:
            return {
                ...state,
                items: null
            };
        default:
            return state;
    }
};