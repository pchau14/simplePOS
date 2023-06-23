import {Button, Form, Input, List, Skeleton, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {applyCoupon, getInfo, getShipping, setShipMethod} from "../actions/order";
import {useEffect} from "react";
import {getItems, getTotal} from "../actions/user";
import {removeCoupon} from "../actions/order";
import {DeleteOutlined} from "@ant-design/icons";

const CartCheckout = () => {
    const {items, prices} = useSelector(state => state.user);
    const {infos, ship, coupon} = useSelector(state => state.order);
    const dispatch = useDispatch();

    const renderTotalInfos = () => {
        dispatch(getInfo(localStorage.getItem('customer_token'), localStorage.getItem('cart_id')));
        dispatch(getTotal(localStorage.getItem('customer_token'), localStorage.getItem('cart_id')));
    }

    useEffect(() => {
        dispatch(setShipMethod(localStorage.getItem('customer_token'), localStorage.getItem('cart_id')))
        dispatch(getItems(localStorage.getItem('customer_token'), localStorage.getItem('cart_id')));
        dispatch(getShipping(localStorage.getItem('customer_token'), localStorage.getItem('cart_id')));
        renderTotalInfos();
    }, []);

    const handleApply = (e) => {
        dispatch(applyCoupon(localStorage.getItem('customer_token'), localStorage.getItem('cart_id'), e.coupon)).then(() => {
            renderTotalInfos();
        });
    };

    const handleRemove = () => {
        dispatch(removeCoupon(localStorage.getItem('customer_token'), localStorage.getItem('cart_id'))).then(() => {
            renderTotalInfos();
        });
    }

    return (
        <div className='cartBox'>
            <div className="cartHeaderCheckout">
                <h2><strong>Current Cart</strong></h2>
            </div>
            {items.length > 0 ? (
                <List
                    dataSource={items}
                    renderItem={(item) => {
                        return (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    avatar={<img src={item.product.image.url} style={{marginLeft: '2vw'}}
                                                 width={50}/>}
                                    title={item.product.name}
                                    description={'Quantity: ' + item.quantity}
                                />
                                <div className="itemQuantity" style={{marginRight: '2vw'}}>
                                    <p>{'$' + (item.product.price_range.minimum_price.regular_price.value * item.quantity)}</p>
                                </div>
                            </List.Item>
                        )
                    }}
                ></List>
            ) : (
                <Skeleton active/>
            )}

            <h2 className='divider'>Shipping Method</h2>
            {ship.length > 0 ? (
                <p style={{textAlign: 'start', marginLeft: '3vw', fontSize: 'medium'}}>
                    <strong>{ship[0].available_shipping_methods[0].carrier_title}: </strong>${ship[0].available_shipping_methods[0].amount.value}
                </p>
            ) : (
                <div></div>
            )}

            <h2 className='divider'>Discount Code</h2>
            {infos.cart && infos.cart.applied_coupons ? (
                <>
                    {infos.cart.applied_coupons.map((item, index) => {
                        return (
                            <>
                                <p style={{textAlign: 'start', marginLeft: '3vw', fontSize: 'medium'}} key={index}>
                                    {item.code}
                                    <span key={index}>
                                        <Button onClick={handleRemove} size={'small'} style={{marginLeft: '2vw'}}
                                                icon={<DeleteOutlined/>} danger/>
                                    </span>
                                </p>
                            </>
                        )
                    })}
                </>
            ) : (
                <></>
            )}

            <Space.Compact>
                <Form onFinish={handleApply}>
                    <Form.Item name='coupon'>
                        <Input allowClear placeholder="Coupon Code"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType='submit'>Apply</Button>
                    </Form.Item>
                </Form>
            </Space.Compact>

            {coupon.errors ? (
                <p className="alert alert-danger" role="alert" style={{color: "red"}}>
                    {coupon.errors[0].message}
                </p>
            ) : (<></>)}

            <h2 className='divider'>Total</h2>
            {items.length > 0 && prices.grand_total ? (
                <p style={{fontSize: 'large', marginBottom: '2.5vh'}}>
                    <strong>${prices.grand_total.value}</strong>
                </p>
            ) : (
                <Skeleton active/>
            )}
        </div>
    )
}

export default CartCheckout;