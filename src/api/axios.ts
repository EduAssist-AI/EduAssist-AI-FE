// src/api/axios.ts
import axios from 'axios';
import { store } from '../store/store';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const localToken = localStorage.getItem('access-token');
    const reduxToken = store.getState().auth?.token;

    const token = reduxToken || localToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn('No auth token found');
    }

    console.log("Outgoing Axios Request:", {
    url: config.url,
    method: config.method,
    headers: config.headers,
    data: config.data,
  });

    return config;
});

// api.interceptors.response.use(
//   (response) => {
//     console.log("Axios Response:", response);
//     return response;
//   },
//   (error) => {
//     console.error("Axios Error:", error.response || error.message);
//     return Promise.reject(error);
//   }
// );

export default api;
