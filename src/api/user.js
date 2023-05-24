import axios from "./axios";
import authHeader from "./authHeader";

const ALL_PRODUCT_URL = 'rest/V1/products?searchCriteria';
// const PRODUCT_URL = 'rest/V1/products?searchCriteria[page_size]=20';
const URL = '/graphql';
const getAllProducts = () => {
    return axios.get(
        ALL_PRODUCT_URL,
        {
            headers: authHeader()
        }
    );
}

// const getProducts = () => {
//     return axios.get(
//         PRODUCT_URL,
//         {
//             headers: authHeader()
//         }
//     );
// }

const getProducts = () => {
    return axios({
        url: URL,
        method: 'POST',
        data: {
            query: `
            {
                productCollection {
                    allProducts {
                      sku
                      name
                      price
                      image
                    }
                  }
              }
            `
        }
    })
}

export default {getAllProducts, getProducts};