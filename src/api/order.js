import axios from "./axios";

const GRAPH_URL = '/graphql';

const getUserInfo = (token, id) => {
    return axios({
        url: GRAPH_URL,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            query: `
                {
                  cart(cart_id: "` + id + `") {
                    billing_address {
                      city
                      country {
                        code
                        label
                      }
                      firstname
                      lastname
                      postcode
                      region {
                        code
                        label
                      }
                      street
                      telephone
                    }
                    shipping_addresses {
                      firstname
                      lastname
                      street
                      city
                      postcode
                      region {
                        code
                        label
                      }
                      country {
                        code
                        label
                      }
                      telephone
                    }
                    available_payment_methods {
                      code
                      title
                    }
                    applied_coupons {
                     code
                    }   
                  }
                }
            `
        }
    })
}

const getShippingMethod = (token, id) => {
    return axios({
        url: GRAPH_URL,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            query: `
                {
                  cart(cart_id: "` + id + `") {
                    shipping_addresses {
                      available_shipping_methods {
                        amount {
                          currency
                          value
                        }
                        available
                        carrier_code
                        carrier_title
                        error_message
                        method_code
                        method_title
                        price_excl_tax {
                          value
                          currency
                        }
                        price_incl_tax {
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

const setShippingAddress = (token, id, address) => {
    return axios({
        url: GRAPH_URL,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            query: `
            mutation {
              setShippingAddressesOnCart(
                input: {
                  cart_id: "` + id + `"
                  shipping_addresses: [
                    {
                      address: {
                        firstname: "` + address.firstname + `"
                        lastname: "` + address.lastname + `"
                        street: "` + address.street + `"
                        city:"` + address.city + `"
                        region: null
                        region_id: null
                        postcode: "` + address.postcode + `"
                        country_code: "VN"
                        telephone: "` + address.telephone + `"
                        save_in_address_book: true
                      }
                    }
                  ]
                }
              ) {
                cart {
                  shipping_addresses {
                    firstname
                    lastname
                    street
                    city
                    postcode
                    telephone
                  }
                }
              }
            }
            `
        }
    })
}

const setBillingAddress = (token, id, address) => {
    return axios({
        url: GRAPH_URL,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            query: `
            mutation {
              setBillingAddressOnCart(
                input: {
                  cart_id: "` + id + `"
                  billing_address: {
                      address: {
                        firstname: "` + address.firstname + `"
                        lastname: "` + address.lastname + `"
                        street: "` + address.street + `"
                        city:"` + address.city + `"
                        region: null
                        region_id: null
                        postcode: "` + address.postcode + `"
                        country_code: "VN"
                        telephone: "` + address.telephone + `"
                        save_in_address_book: true
                    }
                  }
                }
              ) {
                cart {
                  billing_address {
                    firstname
                    lastname
                    street
                    city
                    postcode
                    telephone
                  }
                }
              }
            }
            `
        }
    })
}

const applyCoupon = (token, id, code) => {
    return axios({
        url: GRAPH_URL,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            query: `
            mutation {
              applyCouponToCart(
                input: {
                  cart_id: "` + id + `"
                  coupon_code: "` + code + `"
                }
              ) {
                cart {
                  applied_coupons {
                    code
                  }
                }
              }
            }
            `
        }
    })
}

const removeCoupon = (token, id) => {
    return axios({
        url: GRAPH_URL,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            query: `
            mutation {
              removeCouponFromCart(
                input:
                  { cart_id: "` + id + `" }
                ) {
                cart {
                  applied_coupons {
                    code
                  }
                }
              }
            }
           `
        }
    })
}

const setPayment = (token, id, code) => {
    return axios({
        url: GRAPH_URL,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            query: `
            mutation {
              setPaymentMethodOnCart(
                input: {
                  cart_id: "` + id + `"
                  payment_method: { 
                    code: "` + code + `"
                    }
                }
              ) {
                cart {
                  selected_payment_method {
                    code
                  }
                }
              }
            }
            `
        }
    })
}

const setShipMethod = (token, id) => {
    return axios({
        url: GRAPH_URL,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            query: `
            mutation {
              setShippingMethodsOnCart(
                input: {
                  cart_id: "` + id + `",
                  shipping_methods: [
                    {
                      carrier_code: "flatrate"
                      method_code: "flatrate"
                    }
                  ]
                }
              ) {
                cart {
                  shipping_addresses {
                    selected_shipping_method {
                      carrier_code
                      carrier_title
                      method_code
                      method_title
                    }
                  }
                }
              }
            }
            `
        }
    })
}

const placeOrder = (token, id) => {
    return axios({
        url: GRAPH_URL,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            query: `
            mutation {
              placeOrder(input: {
                cart_id: "` + id + `"
                }) {
                order {
                  order_number
                }
              }
            }
            `
        }
    })
}

export default {
    getUserInfo,
    getShippingMethod,
    setShippingAddress,
    setBillingAddress,
    applyCoupon,
    removeCoupon,
    setPayment,
    setShipMethod,
    placeOrder
};