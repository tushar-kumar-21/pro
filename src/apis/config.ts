import axios from "axios";
// import { decodeToken } from "../pages/auth/session";
import { showToast } from "./apiRequests";
// import { storage } from "../hooks/useStorage";

// const session = storage();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "https://m16614dm-9696.inc1.devtunnels.ms/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token: any = sessionStorage.getItem(
      import.meta.env.VITE_SECURITY_KEY || "CATHY_DESIGNOWEB"
    );
    // const authToken = decodeToken(token) || "";
    const authToken =  "";
    if (authToken != "") {
      config.headers[
        "Authorization"
        ] = `Bearer ${authToken}`;
      // ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTZlNTc5OWNhN2RiYmY0NWExZDdkOSIsImVtYWlsIjoiYWJoaXNoZWswMUBnbWFpbC5jb20iLCJyb2xlIjoiRW1wbG95ZXIiLCJpYXQiOjE3NTczMTkxMDYsImV4cCI6MTc1NzU3ODMwNn0.hN77P29Xfq2ujMMyqMi7vyek06gIMe85485CnvzF8Qw`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for logging responses
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.data?.status === -2) {
      showToast("error", "Session has been expired");
      setTimeout(()=>{
        window.location.href = "/auth/employer/login"
      }, 2000)
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
