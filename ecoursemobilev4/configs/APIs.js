import axios from "axios";

const BASE_URL = 'https://thanhduong.pythonanywhere.com/';
// const BASE_URL = ' http://192.168.0.107:8000/';

export const endpoints = {
    'categories': '/categories/',
    'courses': '/courses/'
};

export default axios.create({
    baseURL: BASE_URL
});