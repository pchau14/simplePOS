import {Header} from "antd/es/layout/layout";
import {Col, Row} from "antd";
import Shipping from './Shipping';
import Logout from "./Logout";
import CartCheckout from './CartCheckout';
import Billing from "./Billing";
import Payment from "./Payment";
import Order from "./Order";

const Checkout = () => {
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
                        <Payment/>
                        <Shipping/>
                        <Billing/>
                    </div>
                </Col>
                <Col span={10}>
                    <CartCheckout/>
                    <Order/>
                </Col>
            </Row>
        </>
    );
}

export default Checkout;