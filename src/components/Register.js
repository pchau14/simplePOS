import {useRef, useState, useEffect} from 'react';
import {RegisterAction} from '../api/auth';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const USER_REGEX = /^[A-z][A-z0-9]{1,10}$/;
const PWD_REGEX = /^[A-z0-9-_]{2,23}$/;
const REGISTER_URL = '/graphql';

export default function Register() {
    const userRef = useRef();
    const errRef = useRef();

    const [firstname, setFirstname] = useState('');
    const [validFirstname, setValidFirstname] = useState(false);

    const [lastname, setLastname] = useState('');
    const [validLastname, setValidLastname] = useState(false);

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
        setValidFirstname(USER_REGEX.test(firstname));
    }, [firstname]);

    useEffect(() => {
        setValidLastname(USER_REGEX.test(lastname));
    }, [lastname]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd]);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validEmail || !validPwd || !validFirstname || !validLastname) {
            setErrMsg('Please input a valid firstname, lastname, email or password.');
        } else {
            try {
                const response = await RegisterAction(REGISTER_URL, firstname, lastname, email, pwd);
                // console.log(response?.data);
                // console.log(JSON.stringify(response));
                setSuccess(true);

                // clear state for input
                setFirstname('');
                setLastname('');
                setEmail('');
                setPwd('');
            } catch (e) {
                if (!e?.response) {
                    setErrMsg('No Server Response');
                } else if (e.response?.status === 409) {
                    setErrMsg('Email Exist');
                } else {
                    setErrMsg('Registration Failed');
                }
                errRef.current.focus();
            }
        }
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>Register Successfully.</h1>
                    <p>
                        <a href="/login">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"
                       style={{color: "red"}}>{errMsg}</p>
                    <form className="login" onSubmit={handleRegister}>
                        <h2>Register</h2>
                        <input
                            type="text"
                            id="firstname"
                            placeholder="First Name"
                            autoComplete="off"
                            ref={userRef}
                            onChange={(e) => setFirstname(e.target.value)}
                            value={firstname}
                            required
                        />
                        <input
                            type="text"
                            id="lastname"
                            placeholder="Last Name"
                            autoComplete="off"
                            ref={userRef}
                            onChange={(e) => setLastname(e.target.value)}
                            value={lastname}
                            required
                        />
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
                        <button>Sign Up</button>
                    </form>
                    <p>
                        Already registered?
                        <br/>
                        <a href='/login'>Sign In</a>
                    </p>
                </section>
            )
            }
        </>
    );
}
