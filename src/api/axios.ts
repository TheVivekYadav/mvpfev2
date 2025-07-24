// src/api/axiosInstance.ts

import axios, {AxiosError} from 'axios';


// Define a type for your expected error response from the backend
interface ErrorResponse {
    error: string;
}

const API_URL: string = "http://localhost:8080/api";

const axiosInstance = axios.create({
    baseURL: API_URL, // <-- FIX: Corrected typo from baseU4 to baseURL
    withCredentials: true,
    timeout: 10000,
});

// This request interceptor is optional. You can use it to add an
// authorization header if you are using bearer tokens.
axiosInstance.interceptors.request.use(
    (config) => {
        // const token = getLocalAccessToken();
        // if (token) {
        //   config.headers['Authorization'] = 'Bearer ' + token;
        // }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError<ErrorResponse>) => {
        const originalRequest = error.config;

        // Check if the error is a 401 and that we haven't already retried the request
        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true; // Mark that we are retrying this request

            try {
                // FIX: Use the base 'axios' to prevent infinite loops
                await axios.post(
                    `${API_URL}/auth/users/refresh-access`,
                    {},
                    {withCredentials: true}
                );

                // After a successful refresh, retry the original request
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                // If the refresh token fails, redirect to login
                console.error("Session expired. Redirecting to login.");
                // In a real app, you might want to clear local storage or state here
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;