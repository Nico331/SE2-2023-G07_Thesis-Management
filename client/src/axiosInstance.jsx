import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8081/API/'
});

export default instance;
