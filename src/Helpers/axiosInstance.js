import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 🔥 RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // 🔥 Auto logout
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
