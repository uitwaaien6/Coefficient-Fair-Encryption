import axios from 'axios';

export default axios.create({
    baseURL: `https://908deb51661d.ngrok.io`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});