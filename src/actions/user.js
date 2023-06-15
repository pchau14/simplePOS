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
    GET_ITEMS_FAIL,
    SET_MESSAGE, GET_PRICE_SUCCESS, GET_PRICE_FAIL
} from "./types";
import CustomerService from '../api/user';

export const getCustomer = () => (dispatch) => {
    return CustomerService.getCustomers().then(
        (data) => {
            dispatch({
                type: GET_CUSTOMER_SUCCESS,
                payload: data.data.items,
            });

            return Promise.resolve();
        },
        (error) => {
            const message = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message || error.toString();

            dispatch({
                type: GET_CUSTOMER_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
}
export const getProducts = (value) => (dispatch) => {
    return CustomerService.getProducts(value).then(
        (data) => {
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: data.data.data.products.items,
            })
        },
        (error) => {
            const message = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message || error.toString();

            dispatch({
                type: GET_PRODUCTS_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
}

export const createToken = (token, email) => (dispatch) => {
    return CustomerService.createCustomerToken(token, email).then(
        (data) => {
            dispatch({
                type: GEN_TOKEN_SUCCESS,
                payload: data,
            })
        },
        (error) => {
            const message = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message || error.toString();

            dispatch({
                type: GEN_TOKEN_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
}

export const createCart = (token) => (dispatch) => {
    return CustomerService.createCart(token).then(
        (data) => {
            dispatch({
                type: CRT_CART_SUCCESS,
                payload: data,
            })
        },
        (error) => {
            const message = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message || error.toString();

            dispatch({
                type: CRT_CART_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
}

export const getItems = (token, id) => (dispatch) => {
    return CustomerService.getCartInfo(token, id).then(
        (data) => {
            dispatch({
                type: GET_ITEMS_SUCCESS,
                payload: data.data.data.cart.items,
            })
        },
        (error) => {
            const message = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message || error.toString();

            dispatch({
                type: GET_ITEMS_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
}

export const getTotal = (token, id) => (dispatch) => {
    return CustomerService.getCartInfo(token, id).then(
        (data) => {
            dispatch({
                type: GET_PRICE_SUCCESS,
                payload: data.data.data.cart.prices,
            })
        },
        (error) => {
            const message = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message || error.toString();

            dispatch({
                type: GET_PRICE_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
}
