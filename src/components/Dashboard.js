import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

const Dashboard = () => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const isLogin = localStorage.getItem('authenticated');
        if (isLogin) {
            setAuth(isLogin);
        }
    }, []);

    if (!auth) {
        return <Navigate replace to='/' />;
    } else {
        return (
            <>
                <div>
                    <h2>Welcome to Dashboard</h2>
                </div>
            </>
        )

    }
};

export default Dashboard;