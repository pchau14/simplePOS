import axios from "./axios";
import authHeader from "./authHeader";

const ALL_PRODUCT_URL = 'rest/V1/products?searchCriteria';
const CUSTOMER_URL = 'rest/V1/customers/search?searchCriteria';
const GRAPH_URL = '/graphql';

const getAllProducts = () => {
    return axios.get(
        ALL_PRODUCT_URL,
        {
            headers: authHeader()
        }
    );
}

const getCustomers = () => {
    return axios.get(
        CUSTOMER_URL,
        {
            headers: authHeader()
        }
    )
};

const getProducts = (value) => {
    return axios({
        url: GRAPH_URL,
        method: 'POST',
        data: {
            query: `
              {
              products(search: "` + value + `") {
                total_count
                items {
                  id
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
                page_info {
                  page_size
                  current_page
                }
              }
              }
            `
        }
    })
};



export default {getAllProducts, getProducts, getCustomers};