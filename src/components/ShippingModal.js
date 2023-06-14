import {Button, Form, Input, Modal, Skeleton} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getInfo, setShipAddress} from "../actions/order";

const ShippingModal = () => {
    const {infos} = useSelector(state => state.order);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState({});
    const [err, setErr] = useState(true);
    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleSubmit = (e) => {
        setData(e);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (JSON.stringify(data) !== '{}') {
            for (const key in data) {
                if (!data[key]) {
                    setErr(true);
                    break;
                } else {
                    setErr(false);
                }
            }
        }
    }, [data]);

    useEffect(() => {
        if (!err) {
            dispatch(setShipAddress(localStorage.getItem('customer_token'), localStorage.getItem('cart_id'), data)).then(() => {
                dispatch(getInfo(localStorage.getItem('customer_token'), localStorage.getItem('cart_id')));
            });
        }
    }, [err])

    return (
        <>
            {infos.cart ? (
                <>
                    <Button onClick={showModal} style={{position: 'relative', float: 'right'}}>
                        Change address
                    </Button>

                    <Modal title="New Shipping Address" open={isModalOpen} onOk={form.submit} onCancel={handleCancel}>
                        <Form onFinish={handleSubmit} form={form}>
                            <Form.Item label='Firstname' name='firstname' required>
                                <Input className='shippingInput'/>
                            </Form.Item>
                            <Form.Item label='Lastname' name='lastname' required>
                                <Input className='shippingInput'/>
                            </Form.Item>
                            <Form.Item label='Street' name='street' required>
                                <Input className='shippingInput'/>
                            </Form.Item>
                            <Form.Item label='Country'>
                                <Input className='shippingInput' value='VN' placeholder='VN' initialvalues='VN'
                                       disabled/>
                            </Form.Item>
                            <Form.Item label='City' name='city' required>
                                <Input className='shippingInput'/>
                            </Form.Item>
                            <Form.Item label='Zip/Postal Code' name='postcode' required>
                                <Input className='shippingInput'/>
                            </Form.Item>
                            <Form.Item label='Phone Number' name='telephone' required>
                                <Input className='shippingInput'/>
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            ) : (
                <Skeleton active/>
            )}
        </>
    )
};

export default ShippingModal;