import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import {Routes, Route} from 'react-router-dom';

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path='/' element={<Register/>}/>
                <Route exact path='/login' element={<Login/>}/>
            </Routes>
        </div>
    );
}

