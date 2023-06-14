import {Header} from "antd/es/layout/layout";
import {Card, Col, List, Row, Radio} from "antd";
import {getItems, getTotal} from "../actions/user";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getInfo, getShipping} from '../actions/order';
import Shipping from './Shipping';
import Logout from "./Logout";
import CartCheckout from './CartCheckout';
import Billing from "./Billing";
import Payment from "./Payment";

const Checkout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItems(localStorage.getItem('customer_token'), localStorage.getItem('cart_id')));
        dispatch(getTotal(localStorage.getItem('customer_token'), localStorage.getItem('cart_id')));
        dispatch(getShipping(localStorage.getItem('customer_token'), localStorage.getItem('cart_id')));
        dispatch(getInfo(localStorage.getItem('customer_token'), localStorage.getItem('cart_id')));
    }, []);

    return (
        <>
            <Header style={{color: 'white'}}>
                <strong>CHECK OUT</strong>
                <Logout/>
            </Header>
            <Row>
                <Col span={14}>
                    <div style={{marginLeft: '4vw'}}>
                        <h1 style={{textAlign: 'start', marginTop: '3vw'}}><strong>Customer Info</strong></h1>
                        <Shipping/>
                        <Billing />
                        <Payment />
                    </div>
                </Col>
                <Col span={10}>
                    <CartCheckout/>
                </Col>
            </Row>
        </>
    );
}

export default Checkout;