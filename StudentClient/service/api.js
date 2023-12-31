import axios from 'axios';

// const baseURL = 'http://localhost:5000';
const baseURL = 'http://192.168.29.186:5000';;

const api = axios.create({
    baseURL: baseURL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

const apiEndpoints = {
    login: ({ regNo, password }) => api.post('/student-login', { regNo, password }),
    logout: () => api.post('/student-logout').then(response => console.log(response)).catch(error => console.error(error)),
    register: ({ name, regNo, branch, section, batch, password }) =>
        api.post('/student-register', { name, regNo, branch, section, batch, password }),
    getProfile: (token) => {
        setAuthToken(token);
        return api.get('/student-profile');
    },
    getMyResults: (token) => {
        setAuthToken(token);
        return api.get('/my-results');
    },
};


export default apiEndpoints;