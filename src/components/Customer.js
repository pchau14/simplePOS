import {Avatar, List, Select} from "antd";
import {useEffect, useState} from "react";
import {Header} from "antd/es/layout/layout";
import UserService from "../api/user";
import CustomerService from "../api/customer";
const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [cart, setCart] = useState('');
    const [items, setItems] = useState([]);

    const fetchCustomers = async () => {
        const {data} = await UserService.getCustomers();
        const customers = data.items;
        setCustomers(customers);
        // console.log(customers);
    };

    const customerToken = async () => {
        await CustomerService.createCustomerToken(email);
        setToken(localStorage.getItem('customer_token'));
    }

    const createCart = async () => {
       await CustomerService.createCart(token);
       setCart(localStorage.getItem('cart_id'));
    }

    const getItems = async () => {
        if (cart) {
            const {data} = await CustomerService.getCartItems(token, cart);
            if (data.data.cart.items?.length) {
                setItems(data.data.cart.items);
            }
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    useEffect(() => {
        customerToken();
    }, [email]);

    useEffect(() => {
        createCart();
    }, [token]);

    useEffect(() => {
        getItems();
        setItems([]);
    }, [cart]);

    return (
        <>
            <Header style={{color: 'white'}}>
                <strong>CART</strong>
            </Header>
            <br/>
            <Select
                defaultValue='Customer'
                style={{width: 200}}
                size='large'
                onChange={(value) => {
                    setEmail(value);
                }}
                options={customers.map((customer) => (
                    {value: customer.email, label: customer.firstname + ' ' + customer.lastname}
                ))}
            />
            { items ? (
                <List
                    itemLayout="horizontal"
                    renderItem={(item) => {
                        return (
                            // console.log(item)
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<img src={item.product.image.url} style={{marginLeft: '10px'}} width={50} />}
                                    title={item.product.name}
                                />
                            </List.Item>
                        )
                    }}
                    dataSource={items}
                ></List>
            ) : (
                <div>Empty</div>
            )}
        </>
    )
}

export default Customer;