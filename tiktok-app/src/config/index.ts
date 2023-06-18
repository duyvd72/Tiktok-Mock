

import axios from "axios";


const API: { [key: string]: any } = axios.create({
    baseURL: 'http://localhost:3005/',
})

API.interceptors.request.use(function (config: any) {
    return config;
}, function (error: any) {
    return Promise.reject(error);
});

API.interceptors.response.use(function (response: any) {
    return response.data;
}, function (error: any) {

    return Promise.reject(error);
});

export const setToken = (token: string) => {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default API