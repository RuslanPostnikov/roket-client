import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: { 'Access-Control-Allow-Origin': true }
});

export const fetchCategories = () => API.get('categories');
export const fetchNewsByCategory = (id: number, page: number = 1) => API.get(`categories/${id}?page=${page}`);
export const fetchStory = (id: number) => API.get(`news/${id}`);

