import axios from "axios";
import { BASE_URL } from "./constants";
// Create a new Axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});     

// request Interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        config.headers = {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            Accept: "application/json",
        };
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

// response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to a 403 response
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log("bug");

            try {
                const response = await axiosInstance.post("/user/refresh", {
                    refreshToken: localStorage.getItem("refreshToken"),
                });

                // If the refresh is successful, update the original request with the new access token
                const newAccessToken = response.data.accessToken;
                localStorage.setItem("accessToken", response?.data?.accessToken);
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                // Retry the original request with the updated headers
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token failed", refreshError);
                throw refreshError; // Propagate the error further
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;