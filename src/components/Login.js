import {useRef, useState, useEffect} from 'react';
import {LoginAction} from '../api/auth';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^[A-z0-9-_]{2,23}$/;
const LOGIN_URL = '/graphql';

export default function Login() {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const [success, setSuccess] = useState(false);

    // useEffect(() => {
    //   userRef.current.focus();
    // }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await LoginAction(LOGIN_URL, email, pwd);
            const customerToken = JSON.stringify(response?.data.data.generateCustomerToken.token);
            console.log(customerToken);
            // setEmail('');
            // setPwd('');
            // setSuccess(true);
        } catch (e) {
            if (!validEmail || !validPwd) {
                setErrMsg('Please check your email or password.');
            } else if (!e?.response) {
                setErrMsg('No response');
            } else if (e.response?.status === 400) {
                setErrMsg('Missing information.');
            } else if (e.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login failed');
            }
            // errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in.</h1>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive" style={{color:"red"}}>{errMsg}</p>
                    <form className="login" onSubmit={handleSubmit}>
                        <h2>Welcome!</h2>
                        <p>Please log in</p>
                        <input
                            type="text"
                            id="email"
                            placeholder="Email"
                            autoComplete="off"
                            ref={userRef}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Login</button>
                    </form>
                </section>
            )}
        </>
    );
}
