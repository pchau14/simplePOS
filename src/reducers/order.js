import {
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAIL,
    GET_SHIPPING_SUCCESS,
    GET_SHIPPING_FAIL,
    SET_SHIP_ADDRESS_SUCCESS,
    SET_SHIP_ADDRESS_FAIL,
    SET_BILL_ADDRESS_SUCCESS,
    SET_BILL_ADDRESS_FAIL,
    APPLY_COUPON_SUCCESS,
    APPLY_COUPON_FAIL,
    SET_PAYMENT_SUCCESS,
    SET_PAYMENT_FAIL
} from "../actions/types";

const initialState = {
    infos: [],
    ship: [],
    shippingAddress: [],
    billingAddress: [],
    coupon: [],
    payment: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                infos: action.payload
            };
        case GET_USER_INFO_FAIL:
            return {
                ...state,
                infos: null
            }
        case GET_SHIPPING_SUCCESS:
            return {
                ...state,
                ship: action.payload
            };
        case GET_SHIPPING_FAIL:
            return {
                ...state,
                ship: null
            }
        case SET_SHIP_ADDRESS_SUCCESS:
            return {
                ...state,
                shippingAddress: action.payload
            };
        case SET_SHIP_ADDRESS_FAIL:
            return {
                ...state,
                shippingAddress: null
            }
        case SET_BILL_ADDRESS_SUCCESS:
            return {
                ...state,
                billingAddress: action.payload
            };
        case SET_BILL_ADDRESS_FAIL:
            return {
                ...state,
                billingAddress: null
            }
        case APPLY_COUPON_SUCCESS:
            return {
                ...state,
                coupon: action.payload
            };
        case APPLY_COUPON_FAIL:
            return {
                ...state,
                coupon: null
            }
        case SET_PAYMENT_SUCCESS:
            return {
                ...state,
                payment: action.payload
            };
        case SET_PAYMENT_FAIL:
            return {
                ...state,
                payment: null
            }
        default:
            return state;
    }
}