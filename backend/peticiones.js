import Axios from 'axios';
import https from 'https';
import { BK_URL } from './routes'
import Router from 'next/router';

Axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized:false,
})
const api = Axios.create({
    baseURL: BK_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

api.interceptors.response.use(response => response, function (error) {
    if (401 === error.response.status) {
        Router.push('/')
    } else {
        return Promise.reject(error);
    }
});

export const addBearerToken = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
export const removeBearerToken = () => {
    delete api.defaults.headers.common['Authorization'];
}

export const addContentType = (content_type) => {
    delete api.defaults.headers.common['Content-Type'];
    api.defaults.headers.common['Content-Type'] = `${content_type}`
}
export const removeContentType = () => {
    delete api.defaults.headers.common['Content-Type'];
    api.defaults.headers.common['Content-Type'] = `application/json`
}

export default api;