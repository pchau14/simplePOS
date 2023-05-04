import {useNavigate} from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/login')
    }

    return (
        <div>
            <button onClick={handleClick}>Click on me</button>
        </div>
    )
}

export default Home;