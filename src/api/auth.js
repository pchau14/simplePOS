import axios from './axios';

export const RegisterAction = (url, firstname, lastname, email, pwd) => {
    return axios({
        url: url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            query: `
                mutation {
                  createCustomer(
                    input: {
                      firstname: "` + firstname + `"
                      lastname: "` + lastname + `"
                      email: "` + email + `"
                      password: "` + pwd + `"
                      is_subscribed: true
                    }
                  ) {
                    customer {
                      firstname
                      lastname
                      email
                      is_subscribed
                    }
                  }
                }
            `
        }
    })
};

export const LoginAction = (url, email, pwd) => {
    return axios({
        url: url,
        method: 'POST',
        data: {
            query: `
                mutation {
                  generateCustomerToken(
                    email: "` + email + `"
                    password: "` + pwd + `"
                  ) {
                    token
                  }
                }
            `
        }
    });
};

