import {useRef, useState, useEffect} from 'react';
// import {LoginAction} from '../api/auth';
import axios from '../api/axios';

// const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const USER_REGEX = /^[A-z][A-z0-9]{1,10}$/;
const PWD_REGEX = /^[A-z0-9-_]{2,23}$/;
// const LOGIN_URL = '/graphql';
const URL = 'rest/V1/integration/admin/token';

export default function Login() {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

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
        e.preventDefault();
        const userData = {username: username, password: pwd};
        await axios.post(
            URL,
            userData
        ).then((response) => {
            let token = response.data;
            setUsername('');
            setPwd('');
            setSuccess(true);
        }).catch((e) => {
                if (!validUsername || !validPwd) {
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
            })
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in.</h1>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"
                       style={{color: "red"}}>{errMsg}</p>
                    <form className="login" onSubmit={handleSubmit}>
                        <h2>Welcome!</h2>
                        <p>Please log in</p>
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            autoComplete="off"
                            ref={userRef}
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
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
