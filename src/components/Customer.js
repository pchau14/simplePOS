import {useEffect, useState} from "react";
import {Header} from "antd/es/layout/layout";
import {useDispatch, useSelector} from "react-redux";
import {createToken, createCart, getItems, getCustomer} from "../actions/user";
import {List, Select, Button, Popconfirm} from "antd";
import {DeleteOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {addProduct, removeProduct, minusItem} from "../actions/product";

const Customer = () => {
    const [email, setEmail] = useState('');
    const {customers, items} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const getItemsInCart = () => {
        dispatch(getItems(localStorage.getItem('customer_token'), localStorage.getItem('cart_id')));
    }

    const removeItemInCart = (id) => {
        dispatch(removeProduct(localStorage.getItem('customer_token'), localStorage.getItem('cart_id'), id)).then(() => {
            getItemsInCart();
        });
    }

    const minusItemInCart = (id, num) => {
        dispatch(minusItem(localStorage.getItem('customer_token'), localStorage.getItem('cart_id'), id, (num - 1))).then(() => {
            getItemsInCart();
        });
    }

    const addProductInCart = (sku) => {
        dispatch(addProduct(localStorage.getItem('customer_token'), localStorage.getItem('cart_id'), sku)).then(() => {
            getItemsInCart();
        });
    }

    useEffect(() => {
        dispatch(getCustomer());
    }, []);

    useEffect(() => {
        if (email) {
            dispatch(createToken(email)).then(() => {
                dispatch(createCart(localStorage.getItem('customer_token'))).then(() => {
                    if (localStorage.getItem('cart_id')) {
                        getItemsInCart();
                    }
                })
            });
        }
    }, [email]);

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
                    (value) ? setEmail(value) : setEmail('');
                }}
                options={customers.map((customer) => (
                    {value: customer.email, label: customer.firstname + ' ' + customer.lastname}
                ))}
            />
            {items ? (
                <List
                    dataSource={items}
                    renderItem={(item) => {
                        return (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<img src={item.product.image.url} style={{marginLeft: '10px'}} width={50}/>}
                                    title={item.product.name}
                                    description={'Quantity: ' + item.quantity}
                                />
                                <div className="itemQuantity">
                                    <p>{'$' + (item.product.price_range.minimum_price.regular_price.value * item.quantity)}</p>
                                </div>
                                <Button icon={<MinusOutlined/>} size={"small"} style={{marginRight: 10, marginLeft: 10}}
                                        onClick={() => {
                                            minusItemInCart(item.uid, item.quantity);
                                        }}
                                />
                                <Button icon={<PlusOutlined/>} size={"small"}
                                        onClick={() => {
                                            addProductInCart(item.product.sku);
                                        }}/>
                                <Popconfirm
                                    title="Remove"
                                    description="Are you sure to remove this item?"
                                    okText="Yes"
                                    onConfirm={() => {
                                        removeItemInCart(item.uid);
                                    }}
                                    cancelText="No"
                                >
                                    <Button type="primary" danger icon={<DeleteOutlined/>}
                                            style={{marginRight: 10, marginLeft: 10}}
                                            size={"small"}/>
                                </Popconfirm>
                            </List.Item>
                        )
                    }}
                ></List>
            ) : (
                <div>Empty</div>
            )}
        </>
    )
}

export default Customer;