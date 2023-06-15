import {Button} from "antd";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {placeOrder} from "../actions/order";

const Order = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOrder = () => {
        dispatch(placeOrder(localStorage.getItem('customer_token'), localStorage.getItem('cart_id'))).then(() => {
            navigate('/dashboard');
        })
    };

    return (
        <div>
            <Button type={"primary"} size={'large'} style={{fontWeight: 'bold'}} onClick={handleOrder}>
                Order Now
            </Button>
        </div>
    )
}

export default Order;