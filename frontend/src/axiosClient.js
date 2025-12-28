import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost/task-manager/backend/public/api',
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authApis = {
    register : (data) => API.post('/register', data),
    login : (data) => API.post('/login', data),
    logout: () => API.post('/logout'),
};

export const tasksApis = {
    getAll : () => API.get('/tasks'),
    create : (data) => API.post('/tasks', data),
    update : (id,data) => API.put(`/tasks/${id}`,data),
    delete : (id) => API.delete(`/tasks/${id}`),
}
