import './App.css';
import Login from './components/Login';
import {Routes, Route} from 'react-router-dom';
import Dashboard from "./components/Dashboard";

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path='/' element={<Login/>}/>
                <Route exact path='/dashboard' element={<Dashboard/>}/>
            </Routes>
        </div>
    );
}

