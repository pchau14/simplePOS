import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState, useEffect} from "react";
import 'antd/dist/reset.css';
import {Layout, Card, Row, Input, List, Typography, Button, Select} from "antd";
import UserService from '../api/user';
import Logout from "./Logout";
import Customer from "./Customer";
import addToCart from "../api/product";

const {Header, Sider, Content} = Layout;
const {Meta} = Card;

const Dashboard = () => {
    const {isAuth} = useSelector((state) => state.auth);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('bag');
    const [item, setItem] = useState('');
    const [cart, setCart] = useState([]);

    const fetchProducts = async () => {
        const {data} = await UserService.getProducts(search);
        const products = data.data.products.items;
        setProducts(products);
        // console.log(products);
    };

    const addItem = async () => {
        await addToCart(item);
        setItem('');
    };

    useEffect(() => {
        fetchProducts();
    }, [search]);

    useEffect(() => {
        addItem();
    }, [item]);

    if (!isAuth) {
        return <Navigate replace to='/'/>;
    } else {
        return (
            <>
                <Layout>
                    <Sider width='300'>
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
                            <List
                                grid={{column: 5}}
                                renderItem={(product) => {
                                    return (
                                        <Card
                                            hoverable
                                            title={product.name}
                                            key={product.id}
                                            cover={<img src={product.image.url} alt={product.image.label}/>}
                                            onClick={() => {
                                                setItem(product.sku);
                                            }}
                                        >
                                            <Meta title={<Typography.Paragraph>
                                                Price:
                                                ${product.price_range.minimum_price.regular_price.value}
                                            </Typography.Paragraph>}/>
                                            <Button type='link'>Add</Button>
                                        </Card>
                                    );
                                }}
                                dataSource={products}
                            ></List>
                        </Content>
                    </Layout>
                </Layout>
            </>
        )
    }
};

export default Dashboard;