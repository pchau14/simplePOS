import axios from "./axios";

const GRAPH_URL = '/graphql';

const addToCart = (data) => {
    return axios({
        url: GRAPH_URL,
        method: "POST",
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('customer_token')
        },
        data: {
            query: `
                mutation {
                  addProductsToCart(
                    cartId: "` + localStorage.getItem('cart_id') + `"
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
    //     .then((response) => {
    //     console.log(response);
    // })
}

export default addToCart;