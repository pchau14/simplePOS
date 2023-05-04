import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import {Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
    );
}

