import axios from "axios";

const BASE_URL = 'https://thanhduong.pythonanywhere.com/';
// const BASE_URL = ' http://192.168.1.74:8000/';

export const endpoints = {
    'categories': '/categories/',
    'courses': '/courses/',
    'lessons': (courseId) => `/courses/${courseId}/lessons/`,
    'lesson-details': (lessonId) => `/lessons/${lessonId}/`,
    'comments': (lessonId) => `/lessons/${lessonId}/comments/`
};

export default axios.create({
    baseURL: BASE_URL
});