import {Radio, Skeleton} from "antd";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPayment} from "../actions/order";

const Payment = () => {
    const {infos} = useSelector(state => state.order);
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const onChange = (e) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        if (value) {
            dispatch(setPayment(localStorage.getItem('customer_token'), localStorage.getItem('cart_id'), value));
        }
    }, [value]);

    return (
        <div>
            <h2 className='line'>Payment Method</h2>
            {infos.cart ? (
                <div style={{textAlign: 'start'}}>
                    {infos.cart.available_payment_methods.map((item, index) => {
                        return (
                            <>
                                <Radio.Group onChange={onChange} value={value} key={index}>
                                    <Radio value={item.code} key={index}>{item.title}</Radio>
                                </Radio.Group>
                            </>
                        )
                    })}
                </div>
            ) : (
                <Skeleton/>
            )}
        </div>
    )
}

export default Payment;