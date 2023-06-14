import {Navigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useState, useEffect} from "react";
import 'antd/dist/reset.css';
import {Layout, Card, Row, Input, List, Typography, Button, Skeleton} from "antd";
import Logout from "./Logout";
import Customer from "./Customer";
import {addProduct} from "../actions/product";
import {getProducts, getItems} from "../actions/user";

const {Header, Sider, Content} = Layout;
const {Meta} = Card;

const Dashboard = () => {
    const {isAuth} = useSelector(state => state.auth);
    const {products} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [search, setSearch] = useState('bag');
    const [sku, setSku] = useState('');

    useEffect(() => {
        dispatch(getProducts(search));
    }, [search]);

    useEffect(() => {
        if (sku) {
            dispatch(addProduct(localStorage.getItem('customer_token'), localStorage.getItem('cart_id'), sku)).then(() => {
                dispatch(getItems(localStorage.getItem('customer_token'), localStorage.getItem('cart_id')));
            })
        }
    }, [sku]);

    if (!isAuth) {
        return <Navigate replace to='/'/>;
    } else {
        return (
            <>
                <Layout>
                    <Sider width='400'>
                        <Customer/>
                    </Sider>
                    <Layout>
                        <Header>
                            <Row justify="left" align="middle" style={{minHeight: '100%'}}>
                                <Input.Search
                                    placeholder="Search..."
                                    enterButton
                                    allowClear
                                    size='large'
                                    style={{width: '40%'}}
                                    onSearch={(value) => {
                                        setSearch(value);
                                    }}
                                />
                            </Row>
                            <Logout/>
                        </Header>
                        <Content>
                            {products.length > 0 ? (
                                <List
                                    grid={{column: 5}}
                                    dataSource={products}
                                    renderItem={(product) => {
                                        return (
                                            <Card
                                                hoverable
                                                title={product.name}
                                                key={product.id}
                                                cover={<img src={product.image.url} alt={product.image.label}/>}
                                                onClick={() => {
                                                    setSku(product.sku);
                                                }}
                                            >
                                                <Meta title={<Typography.Paragraph>
                                                    Price:
                                                    ${product.price_range.minimum_price.regular_price.value}
                                                </Typography.Paragraph>}/>
                                            </Card>
                                        );
                                    }}
                                ></List>
                            ) : (
                                <Skeleton active/>
                            )}
                        </Content>
                    </Layout>
                </Layout>
            </>
        )
    }
};

export default Dashboard;