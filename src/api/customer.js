import axios from "./axios";

const GRAPH_URL = '/graphql';

const createCustomerToken = (email) => {
    return axios({
        url: GRAPH_URL,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        data: {
            query: `
              mutation{
                  generateCustomerTokenAsAdmin(input: {
                    customer_email: "` + email + `"
                  }){
                    customer_token
                  }
                }
              `
        }
    }).then((response) => {
        if (!response.data.errors) {
            const token = response.data.data.generateCustomerTokenAsAdmin.customer_token;
            localStorage.setItem('customer_token', token);
        }
    })
};

const createCart = (token) => {
    return axios({
        url: GRAPH_URL,
        method: "POST",
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            query: `
                {
                    customerCart {
                        id
                    }
                }
            `
        }
    }).then((response) => {
        if (!response.data.errors) {
            const cartId = response.data.data.customerCart.id;
            localStorage.setItem('cart_id', cartId);
            // localStorage.removeItem('customer_token');
            // console.log(response.data.data.customerCart.id);
        }
    })
}

const getCartItems = (token, id) => {
    return axios({
        url: GRAPH_URL,
        method: "POST",
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            query: `
                {
                  cart(cart_id: "` + id + `") {
                    email
                    items {
                      id
                      uid
                      product {
                        name
                        sku
                        image {
                            url
                            label
                        }
                        price_range {
                            minimum_price {
                                regular_price {
                                    value
                                    currency
                                }
                            }
                        }
                      }
                      quantity
                    }
                  }
                }
            `
        }
    })
}

export default {createCustomerToken, createCart, getCartItems};