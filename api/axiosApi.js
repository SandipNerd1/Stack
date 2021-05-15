import axios from 'axios';

const baseURL = 'https://pocketstack.herokuapp.com/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Authorization': null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

export default axiosInstance;