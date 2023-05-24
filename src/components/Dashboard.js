import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState, useEffect} from "react";
import 'antd/dist/reset.css';
import {Layout, Card, Dropdown, Menu} from "antd";
import UserService from '../api/user';

const {Header, Sider, Content} = Layout;
const {Meta} = Card;

const Dashboard = () => {
    const {isAuth} = useSelector((state) => state.auth);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const {data} = await UserService.getProducts();
        const products = data.data.productCollection.allProducts;
        setProducts(products);
        console.log(products);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    if (!isAuth) {
        return <Navigate replace to='/'/>;
    } else {
        return (
            <>
                <div>
                    <h2>Welcome to Dashboard</h2>
                </div>
                <Layout>
                    <Sider className="dashboardSider">
                        <Header className='dashboardHeader'>
                            Header
                        </Header>
                        <Dropdown
                            overlay={(
                                <Menu>
                                    <Menu.Item key="0">
                                        Menu Item One
                                    </Menu.Item>
                                    <Menu.Item key="1">
                                        Menu Item Two
                                    </Menu.Item>
                                    <Menu.Item key="1">
                                        Menu Item Three
                                    </Menu.Item>
                                </Menu>
                            )}
                            trigger={['click']}>
                            <a className="ant-dropdown-link"
                               onClick={e => e.preventDefault()}>
                                Open Dropdown
                            </a>
                        </Dropdown>
                    </Sider>
                    <Layout className='dashboardLayout'>
                        <Header className='dashboardHeader'>
                            Sample Header
                        </Header>
                        <Content className='dashboardContent'>
                            {products.map((product) => (
                                <Card
                                    hoverable
                                    style={{width: 240}}
                                    cover={<img alt="example"
                                                src={product.image} />}
                                >
                                    <Meta title="Europe Street beat" description="www.instagram.com"/>
                                    <Meta title="Europe Street beat" description="www.instagram.com"/>
                                </Card>
                            ))}

                        </Content>
                    </Layout>
                </Layout>
            </>
        )

    }
};

export default Dashboard;