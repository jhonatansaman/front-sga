import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
    // baseURL: 'https://back-almoxarifado.herokuapp.com',
})

export default api;