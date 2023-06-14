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
                        save_in_address_book: false
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
                        save_in_address_book: false
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
export default {getUserInfo, getShippingMethod, setShippingAddress, setBillingAddress, applyCoupon, setPayment};