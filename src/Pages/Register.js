import {useRef, useState, useEffect} from 'react';
import axios from '../api/axios';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const USER_REGEX = /^[A-z]{1,10}$/;
const PWD_REGEX = /^[A-z0-9-_]{2,23}$/;
const REGISTER_URL = '/graphql';

export default function Register() {
    const userRef = useRef();
    const errRef = useRef();

    const [firstname, setFirstname] = useState('');
    const [validFirstname, setValidFirstname] = useState(false);

    const [lastname, setLasttname] = useState('');
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
        console.log(validPwd)
        if (!validEmail || !validPwd) {
            setErrMsg('Please input a valid username or password.');
        } else {
            try {
                const response = await axios({
                    url: REGISTER_URL,
                    method: 'POST',
                    data: {
                        query: `
                        mutation {
                          createCustomer(
                            input: {
                              firstname: "` + firstname + `"
                              lastname: "` + lastname + `"
                              email: "` + email + `"
                              password: "` + pwd + `"
                              is_subscribed: true
                            }
                          ) {
                            customer {
                              firstname
                              lastname
                              email
                              is_subscribed
                            }
                          }
                        }
                        `
                    }
                });
                console.log(response?.data);
                // console.log(response?.accessToken);
                console.log(JSON.stringify(response));
                // setSuccess(true);
                //clear state and controlled inputs
                //need value attrib on inputs for this
                setEmail('');
                setPwd('');
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 409) {
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
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form className="login" onSubmit={handleRegister}>
                        <h2>Register</h2>
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
