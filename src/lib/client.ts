import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 10000
});

client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const rs = await axios.get(`${API_BASE_URL}/auth/refresh`, { withCredentials: true })
                const { accessToken } = rs.data.data;

                localStorage.setItem('accessToken', accessToken)

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return client(originalRequest)
            } catch (error) {
                localStorage.removeItem('accessToken')
                return Promise.reject(error)
            }
        }
        return Promise.reject(error);
    }
);

export default client;