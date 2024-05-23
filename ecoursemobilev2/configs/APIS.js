import axios from "axios";

const BASE_URL = 'https://thanhduong.pythonanywhere.com/';
// const BASE_URL = ' http://192.168.1.74:8000/';

export const endpoints = {
    'categories': '/categories/',
    'courses': '/courses/',
    'lessons': (courseId) => `/courses/${courseId}/lessons/`,
    'lesson-details': (lessonId) => `/lessons/${lessonId}/`,
    'comments': (lessonId) => `/lessons/${lessonId}/comments/`,
    'register': '/users/',
    'login': '/o/token/',
    'current-user': '/users/current-user/'
};

export const authApi = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export default axios.create({
    baseURL: BASE_URL
});