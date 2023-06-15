import {useSelector} from "react-redux";
import {Card, Skeleton} from "antd";
import BillingModal from "./BillingModal";

const Billing = () => {
    const {infos} = useSelector(state => state.order);

    return (
        <div style={{marginTop: '5vh'}}>
            <h2 className='line'>Billing Address</h2>
            {infos.cart && infos.cart.billing_address ? (
                <>
                    <Card hoverable style={{textAlign:'start'}}>
                        <p>Name: <strong>{infos.cart.billing_address.firstname} {infos.cart.billing_address.lastname}</strong></p>
                        <hr className='billingDivider'  />
                        <p>Street: <strong>{infos.cart.billing_address.street[0]}</strong></p>
                        <hr className='billingDivider'  />
                        <p>City: <strong>{infos.cart.billing_address.city}</strong></p>
                        <hr className='billingDivider'  />
                        <p>Zip/Postal Code: <strong>{infos.cart.billing_address.postcode}</strong></p>
                        <hr className='billingDivider'  />
                        <p>Phone number: <strong>{infos.cart.billing_address.telephone}</strong></p>
                    </Card>
                    <br/>
                    <BillingModal/>
                </>
            ) : (
                <>
                    <div></div>
                    <BillingModal/>
                </>
            )}
        </div>
    )
}

export default Billing;