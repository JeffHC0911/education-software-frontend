import axios from 'axios';
import {getEnvVariables} from '../helpers'

const {VITE_API_URL} = getEnvVariables();

const educationSoftApi = axios.create({
    baseURL: VITE_API_URL,
});

//Se configuran los receptores
educationSoftApi.interceptors.request.use(config =>{
    config.headers = {
        ...config.headers,
        'x-token' : localStorage.getItem('token')
    }

    return config;
})

export default educationSoftApi;