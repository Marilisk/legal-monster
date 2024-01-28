import axios from 'axios';

const API_URL = 'http://suggestions.dadata.ru/'
const token = '288732486ec72eee4a1d262d9563011edc5d4b2e'

const dadataApi = axios.create({
    baseURL: API_URL,  
    // withCredentials: true,  
    // method: 'POST',
    
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
    },
})

/* instance.interceptors.request.use( (config) => {
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
})  */

export default dadataApi;