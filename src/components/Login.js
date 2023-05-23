import {useRef, useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {login} from "../actions/auth";

const USER_REGEX = /^[A-z][A-z0-9]{1,10}$/;
const PWD_REGEX = /^[A-z0-9]{7,}$/;

const Login = (props) => {
    let navigate = useNavigate();
    const userRef = useRef();
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
        e.preventDefault();
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
        </>
    );
}
export default Login;