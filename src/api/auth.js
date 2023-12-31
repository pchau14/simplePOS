import axios from "./axios";
export const LOGIN_URL = 'rest/V1/integration/admin/token';

const login = (data) => {
    return axios.post(
        LOGIN_URL,
        data
    ).then((response) => {
        localStorage.setItem("token", response.data);
    });
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("customer_token");
    localStorage.removeItem("cart_id");
};

export default {login, logout};