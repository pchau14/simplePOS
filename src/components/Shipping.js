import {List, Skeleton, Card} from "antd";
import {useSelector} from "react-redux";
import ShippingModal from "./ShippingModal";

const Shipping = () => {
    const {infos} = useSelector(state => state.order);

    return (
        <div>
            <h2 className='line'>Shipping Address</h2>
            {infos.cart ? (
                <>
                    <List
                        dataSource={infos.cart.shipping_addresses}
                        renderItem={(item) => (
                            <>
                                <Card style={{textAlign: 'start'}} hoverable>
                                    <List.Item>
                                        Name: <strong>{item.firstname} {item.lastname}</strong>
                                    </List.Item>
                                    <List.Item>
                                        Street: <strong>{item.street[0]}</strong>
                                    </List.Item>
                                    <List.Item>
                                        City: <strong>{item.city}</strong>
                                    </List.Item>
                                    <List.Item>
                                        Zip/Postal Code: <strong>{item.postcode}</strong>
                                    </List.Item>
                                    <List.Item>
                                        Phone number: <strong>{item.telephone}</strong>
                                    </List.Item>
                                </Card>
                            </>
                        )}
                    />
                    <br/>
                    <ShippingModal/>
                </>
            ) : (
                <Skeleton active/>
            )}
        </div>
    )
};

export default Shipping;