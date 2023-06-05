import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {logout} from "../actions/auth";

const Logout = () => {
    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return (
        <>
            <div className='logoutNav'>
                <a href='/' onClick={logOut}>Log Out</a>
            </div>
        </>
    )
}

export default Logout;