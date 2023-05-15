import React from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './context/AuthProvider';
import axios from './api/axios';

const LOGIN_URL = '/auth';

export default function Login() {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');

    const [pwd, setPwd] = useState('');

    const [errMsg, setErrMsg] = useState('');

    const [success, setSuccess] = useState(false);

    // useEffect(() => {
    //   userRef.current.focus();
    // }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        } catch (e) {}
        console.log(user, pwd);
        setUser('');
        setPwd('');
        setSuccess(true);
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in.</h1>
                </section>
            ) : (
                <form className="login" onSubmit={handleSubmit}>
                    <h2>Welcome!</h2>
                    <p>Please log in</p>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        autoComplete="off"
                        ref={userRef}
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
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
                    {/* <input type="submit" defaultValue="Log In" /> */}
                    <button>Login</button>
                </form>
            )}
        </>
    );
}
