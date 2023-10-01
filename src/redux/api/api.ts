import axios from 'axios';

const DEV_API_URL = 'http://localhost:4444'
export const API_URL = DEV_API_URL

const instance = axios.create({
    baseURL: API_URL,  
    withCredentials: true,  
})

instance.interceptors.request.use( (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

instance.interceptors.response.use( (config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401  
            && error.config && !error.config._isRetry ) { 
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.tokens.accessToken);  
            return instance.request(originalRequest); 
        } catch (error) {
            console.log('not authorised')
        } 
    } 
    throw error;
}) 

export default instance;