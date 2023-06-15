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
    PLACE_ORDER_FAIL,
    SET_MESSAGE
} from "./types";
import OrderService from '../api/order';

export const getInfo = (token, id) => (dispatch) => {
    return OrderService.getUserInfo(token, id).then(
        (data) => {
            dispatch({
                type: GET_USER_INFO_SUCCESS,
                payload: data.data.data,
            })

            return Promise.resolve();
        },
        (error) => {
            const message = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message || error.toString();

            dispatch({
                type: GET_USER_INFO_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
}

export const getShipping = (token, id) => (dispatch) => {
    return OrderService.getShippingMethod(token, id).then(
        (data) => {
            dispatch({
                type: GET_SHIPPING_SUCCESS,
                payload: data.data.data.cart.shipping_addresses,
            })

            return Promise.resolve();
        },
        (error) => {
            const message = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message || error.toString();

            dispatch({
                type: GET_SHIPPING_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
}

export const setShipAddress = (token, id, address) => (dispatch) => {
    return OrderService.setShippingAddress(token, id, address).then(
        (data) => {
            dispatch({
                type: SET_SHIP_ADDRESS_SUCCESS,
                payload: data,
            })

            return Promise.resolve();
        },
        (error) => {
            const message = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message || error.toString();

            dispatch({
                type: SET_SHIP_ADDRESS_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
}

export const setBillAddress = (token, id, address) => (dispatch) => {
    return OrderService.setBillingAddress(token, id, address).then(
        (data) => {
            dispatch({
                type: SET_BILL_ADDRESS_SUCCESS,
                payload: data,
            })

            return Promise.resolve();
        },
        (error) => {
            const message = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message || error.toString();

            dispatch({
                type: SET_BILL_ADDRESS_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
}

export const applyCoupon = (token, id, code) => (dispatch) => {
    return OrderService.applyCoupon(token, id, code).then(
        (data) => {
            dispatch({
                type: APPLY_COUPON_SUCCESS,
                payload: data.data,
            })

            return Promise.resolve();
        },
        (error) => {
            const message = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message || error.toString();

            dispatch({
                type: APPLY_COUPON_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
}

export const removeCoupon = (token, id) => (dispatch) => {
    return OrderService.removeCoupon(token, id).then(
        (data) => {
            dispatch({
                type: REMOVE_COUPON_SUCCESS,
                payload: data,
            })

            return Promise.resolve();
        },
        (error) => {
            const message = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message || error.toString();

            dispatch({
                type: REMOVE_COUPON_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
}

export const setPayment = (token, id, code) => (dispatch) => {
    return OrderService.setPayment(token, id, code).then(
        (data) => {
            dispatch({
                type: SET_PAYMENT_SUCCESS,
                payload: data.data.data.setPaymentMethodOnCart.cart.selected_payment_method.code,
            })

            return Promise.resolve();
        },
        (error) => {
            const message = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message || error.toString();

            dispatch({
                type: SET_PAYMENT_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
}
export const setShipMethod = (token, id) => (dispatch) => {
    return OrderService.setShipMethod(token, id).then(
        (data) => {
            dispatch({
                type: SET_SHIP_METHOD_SUCCESS,
                payload: data,
            })

            return Promise.resolve();
        },
        (error) => {
            const message = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message || error.toString();

            dispatch({
                type: SET_SHIP_METHOD_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
}

export const placeOrder = (token, id) => (dispatch) => {
    return OrderService.placeOrder(token, id).then(
        (data) => {
            dispatch({
                type: PLACE_ORDER_SUCCESS,
                payload: data,
            })

            return Promise.resolve();
        },
        (error) => {
            const message = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message || error.toString();

            dispatch({
                type: PLACE_ORDER_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
}

