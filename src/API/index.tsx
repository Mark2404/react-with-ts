import axios, { AxiosInstance } from 'axios';


const API: AxiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    params: {
        _limit: 100
    },
    headers: {
        'Content-Type': 'application/json',
    },
});
export default API