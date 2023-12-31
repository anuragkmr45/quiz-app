import axios from 'axios';

const baseURL = 'http://localhost:5000'; 

const api = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const setAuthToken = (token, includeBearer = true) => {
    if (token) {
        if (includeBearer) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            api.defaults.headers.common['Authorization'] = token;
        }
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

const apiEndpoints = {
    teacher: {
        logout: () => api.post('/').then(response => console.log(response)).catch(error => console.error(error)),
        login: ({ email, password }) => api.post('/teacher-login', { email, password }),
        register: ({ name, email, password }) => api.post('/teacher-register', { name, email, password }),
        createQuiz: ({ Title, Description, DateCreated, SubjectID, TopicName, Questions }) => {
            const token = localStorage.getItem('authToken');
            setAuthToken(token, false);
            return api.post('/dashboard/add-quiz', { Title, Description, DateCreated, SubjectID, TopicName, Questions });
        },
        getMyQuizzes: () => {
            const token = localStorage.getItem('authToken');
            setAuthToken(token, false);
            return api.get('/dashboard/previous-quizes');
        },
        getQuiz: (quizId) => {
            const token = localStorage.getItem('authToken');
            setAuthToken(token, false);
            return api.get(`/teachers/dashboard/previous-quizes/${quizId}`);
        },
        getQuizResults: (token, quizId) => {
            setAuthToken(token);
            return api.get(`/dashboard/my-quizzes/${quizId}/results`);
        },
    },
    student: {
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
    },
};

export default apiEndpoints;