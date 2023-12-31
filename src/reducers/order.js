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
    REMOVE_COUPON_SUCCESS,
    REMOVE_COUPON_FAIL,
    SET_PAYMENT_SUCCESS,
    SET_PAYMENT_FAIL,
    SET_SHIP_METHOD_SUCCESS,
    SET_SHIP_METHOD_FAIL,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL
} from "../actions/types";

const initialState = {
    infos: [],
    ship: [],
    shipAddress: false,
    billAddress: false,
    coupon: false,
    payment: [],
    shipMethod: false,
    order: false
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
                shipAddress: true
            };
        case SET_SHIP_ADDRESS_FAIL:
            return {
                ...state,
                shipAddress: false
            }
        case SET_BILL_ADDRESS_SUCCESS:
            return {
                ...state,
                billAddress: true
            };
        case SET_BILL_ADDRESS_FAIL:
            return {
                ...state,
                billAddress: false
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
        case REMOVE_COUPON_SUCCESS:
            return {
                ...state,
                coupon: true
            };
        case REMOVE_COUPON_FAIL:
            return {
                ...state,
                coupon: false
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
        case SET_SHIP_METHOD_SUCCESS:
            return {
                ...state,
                shipMethod: true
            };
        case SET_SHIP_METHOD_FAIL:
            return {
                ...state,
                shipMethod: false
            }
        case PLACE_ORDER_SUCCESS:
            return {
                ...state,
                order: true
            };
        case PLACE_ORDER_FAIL:
            return {
                ...state,
                order: false
            }
        default:
            return state;
    }
}