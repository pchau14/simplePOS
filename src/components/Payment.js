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
            console.log(value)
            dispatch(setPayment(localStorage.getItem('customer_token'), localStorage.getItem('cart_id'), value));
        }
    }, [value]);

    return (
        <div style={{marginTop: '5vh'}}>
            <h2 className='line'>Payment Method</h2>
            {infos.cart ? (
                <div>
                    {infos.cart.available_payment_methods.map((item) => {
                        return (
                            <>
                                <Radio.Group onChange={onChange} value={value}>
                                    <Radio value={item.code}>{item.title}</Radio>
                                </Radio.Group>
                            </>
                        )
                    })}
                </div>
            ) : (
                <Skeleton />
            )}
        </div>
    )
}

export default Payment;