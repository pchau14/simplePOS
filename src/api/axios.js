import axios from 'axios';

export default axios.create({
    baseURL: 'http://m246.local',
    headers: {
        "Content-type": "application/json"
    }
});