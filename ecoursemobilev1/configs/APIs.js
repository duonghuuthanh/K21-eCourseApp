import axios from "axios";

const BASE_URL = 'https://thanhduong.pythonanywhere.com/';

export const endpoints = {
    'categories': '/categories/',
    'courses': '/courses/',
    'lessons': (courseId) => `/courses/${courseId}/lessons`,
    'lesson-details': (lessonId) => `/lessons/${lessonId}/`,
    'comments': (lessonId) => `/lessons/${lessonId}/comments/`,
};

export default axios.create({
    baseURL: BASE_URL
});