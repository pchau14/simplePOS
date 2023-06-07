import axios from "./axios";

const GRAPH_URL = '/graphql';

const addToCart = (token, id, data) => {
    console.log(data);
    return axios({
        url: GRAPH_URL,
        method: "POST",
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            query: `
                mutation {
                  addProductsToCart(
                    cartId: "` + id + `"
                    cartItems: [
                      {
                        quantity: 1
                        sku: "` + data + `"
                      }
                    ]
                  )
                  {
                    cart {
                      items {
                        product {
                          name
                          sku
                        }
                        quantity
                      }
                    }
                    user_errors {
                      code
                      message
                    }
                  }
                }
            `
        }
    })
}

const removeFromCart = (token, id, data) => {
    return axios({
        url: GRAPH_URL,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            query: `
            mutation {
              updateCartItems(
                input: {
                  cart_id: "` + id + `",
                  cart_items: [
                    {
                      cart_item_uid: "`+ data +`"
                      quantity: 0
                    }
                  ]
                }
              ){
                cart {
                  items {
                    uid
                    product {
                      name
                    }
                    quantity
                  }
                  prices {
                    grand_total{
                      value
                      currency
                    }
                  }
                }
              }
            }
            `
        }
    })
}

const minusItem = (token, id, data, quantity) => {
    return axios({
        url: GRAPH_URL,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            query: `
            mutation {
              updateCartItems(
                input: {
                  cart_id: "` + id + `",
                  cart_items: [
                    {
                      cart_item_uid: "`+ data +`"
                      quantity: `+ quantity +`
                    }
                  ]
                }
              ){
                cart {
                  items {
                    uid
                    product {
                      name
                    }
                    quantity
                  }
                  prices {
                    grand_total{
                      value
                      currency
                    }
                  }
                }
              }
            }
            `
        }
    })
}

export default {addToCart, removeFromCart, minusItem};