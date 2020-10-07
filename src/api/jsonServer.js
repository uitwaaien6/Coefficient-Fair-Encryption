import axios from 'axios';

export default axios.create({
    baseURL: `https://{ YOUR NGROK URL LINK }.ngrok.io`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});