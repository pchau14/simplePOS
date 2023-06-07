import {
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
    REMOVE_PRODUCT_SUCCESS,
    REMOVE_PRODUCT_FAIL,
    MINUS_ITEM_SUCCESS,
    MINUS_ITEM_FAIL,
    SET_MESSAGE
} from "./types";
import ProductService from '../api/product';

export const addProduct = (token, id, data) => (dispatch) => {
    return ProductService.addToCart(token, id, data).then(
        (data) => {
            dispatch({
                type: ADD_PRODUCT_SUCCESS,
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
                type: ADD_PRODUCT_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
}

export const removeProduct = (token, id, data) => (dispatch) => {
    return ProductService.removeFromCart(token, id, data).then(
        (data) => {
            dispatch({
                type: REMOVE_PRODUCT_SUCCESS,
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
                type: REMOVE_PRODUCT_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
}

export const minusItem = (token, id, data, quantity) => (dispatch) => {
    return ProductService.minusItem(token, id, data, quantity).then(
        (data) => {
            dispatch({
                type: MINUS_ITEM_SUCCESS,
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
                type: MINUS_ITEM_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    )
}