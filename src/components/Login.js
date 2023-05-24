import {useRef, useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {login} from "../actions/auth";
import 'antd/dist/reset.css';
import {Button, Col, Form, Input, Row} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';

const USER_REGEX = /^[A-z][A-z0-9]{1,10}$/;
const PWD_REGEX = /^[A-z0-9]{7,}$/;

const Login = (props) => {
    let navigate = useNavigate();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const {isAuth} = useSelector(state => state.auth);
    const {message} = useSelector(state => state.message);
    const [errMsg, setErrMsg] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        setErrMsg('');
    }, [username, pwd]);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd]);

    const handleSubmit = async (e) => {
        const userData = {username: username, password: pwd};

        if (!validUsername || !validPwd) {
            setErrMsg('Please check your email or password.');
        } else {
            dispatch(login(userData))
                .then(() => {
                    navigate('/dashboard');
                })
        }

        if (isAuth) {
            return <Navigate to='/dashboard'/>;
        }
    };

    return (
        <>
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"
                   style={{color: "red"}}>{errMsg}</p>
                {message && (
                    <div className="form-group">
                        <p className="alert alert-danger" role="alert" style={{color: "red"}}>
                            {message}
                        </p>
                    </div>
                )}

                <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
                    <Col span={6}>
                    <div className="loginForm" >
                        <Form
                            name="login"
                            onFinish={handleSubmit}
                            initialValues={{remember: true}}
                        >
                            <h2><strong>Welcome!</strong></h2>
                            <p>Please log in</p>
                            <Form.Item
                                name="Username"
                                rules={[{
                                    required: true,
                                    message: 'Please enter username'
                                }]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon"/>}
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    autoComplete="off"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                />
                            </Form.Item>
                            <Form.Item
                                name="Password"
                                rules={[{
                                    required: true,
                                    message: 'Please enter password'
                                }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    </Col>
                </Row>
            </section>
        </>
    );
}
export default Login;