import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Dashboard = () => {
    const {isAuth} = useSelector((state) => state.auth);

    if (!isAuth) {
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