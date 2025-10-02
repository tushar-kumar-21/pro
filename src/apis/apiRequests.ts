import { axiosInstance } from "./config";
import toast from "react-hot-toast";
import { STATUS_CODES } from "../utils/constants";

export const showToast = (type: string, message: string) => {
  toast.dismiss();
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  }
};

const handleUnauthorized = () => {
  // toast.error("Session expired");
  sessionStorage.clear(); // Clear authentication tokens
  sessionStorage.clear(); // Clear authentication tokens
  const securityKey = import.meta.env.SECURITY_KEY || "";
  document.cookie = `${securityKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Lax`;
  // window.location.href = UrlHelper.toHome();
};

const getRequest = async (endpoint: string) => {
  try {
    const response = await axiosInstance.get(endpoint);
    // return decryptData(response?.data);
    return response?.data;
  } catch (error: any) {
    if (error?.status === 401) {
      // handleUnauthorized();
    }
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

const deleteRequest = async (endpoint: string, payload?: any) => {
  try {
    const config = payload ? { data: payload } : {};
    const response = await axiosInstance.delete(endpoint, config);
    toast.dismiss();
    showToast("success", "Deleted Successfully");
    return response?.data;
  } catch (error: any) {
    if (error?.status === 401) {
      handleUnauthorized();
    }
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

const postRequest = async (
  endpoint: string,
  payload: any,
  toastCheck: boolean = false,
  onUploadProgress: any = null,
  returnRaw: boolean = false
) => {
  try {
    const headers = {
      "Content-Type":
        payload instanceof FormData
          ? "multipart/form-data"
          : "application/json",
    };

    const response = await axiosInstance.post(
      endpoint,
      payload instanceof FormData ? payload : payload,
      {
        headers,
        responseType: returnRaw ? "blob" : "json", // Handle binary responses if `returnRaw` is true
        onUploadProgress,
      }
    );
    // Handle toast messages if enabled
    if (toastCheck) {
      toast.dismiss();
      showToast("success", response?.data?.message || "Login Succesfull");
    }

    return returnRaw
      ? response
      : {
        response: response.data,
        status: response.status,
      };
  } catch (error: any) {
    if (toastCheck) {
      showToast("error", error?.response?.data?.message || "An error occurred");
      // toast.dismiss();
      // toast.error(
      //   error?.response?.data?.message === "Validation error"
      //     ? error?.response?.data?.errors || "An error occurred"
      //     : error?.response?.data?.message || "An error occurred"
      // );
    }
    if (error?.status === 401) {
      handleUnauthorized();
    }
    throw error;
  }
};

const putRequest = async ({
  endpoint,
  payload,
  toastCheck = false,
  onUploadProgress,
}: {
  endpoint: string,
  payload?: any,
  toastCheck?: boolean,
  onUploadProgress?: any
}) => {
  try {
    const headers = {
      "Content-Type":
        payload instanceof FormData
          ? "multipart/form-data"
          : "application/json",
    };

    const response: any = await axiosInstance.put(
      endpoint,
      payload instanceof FormData ? payload : payload,
      {
        headers,
        onUploadProgress,
      }
    );

    if (toastCheck) {
      toast.dismiss();
      response?.status === STATUS_CODES.SUCCESS
        ? toast.success(response?.data?.message)
        : toast.error(response?.message);
    }

    return { response: response.data, status: response.status };
  } catch (error: any) {
    if (toastCheck) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || "An error occurred");
    }
    if (error?.status === 401) {
      handleUnauthorized();
    }
    throw error;
  }
};

const patchRequest = async ({
  endpoint,
  payload,
  toastCheck = false,
  onUploadProgress,
}: {
  endpoint: string,
  payload?: any,
  toastCheck?: boolean,
  onUploadProgress?: any
}) => {
  try {
    const headers = {
      "Content-Type":
        payload instanceof FormData
          ? "multipart/form-data"
          : "application/json",
    };

    const response: any = await axiosInstance.patch(
      endpoint,
      payload instanceof FormData ? payload : payload,
      {
        headers,
        onUploadProgress,
      }
    );

    if (toastCheck) {
      toast.dismiss();
      response?.status === STATUS_CODES.SUCCESS
        ? toast.success(response?.data?.message)
        : toast.error(response?.message);
    }

    return { response: response.data, status: response.status };
  } catch (error: any) {
    if (toastCheck) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || "An error occurred");
    }
    if (error?.status === 401) {
      handleUnauthorized();
    }
    throw error;
  }
};

const fetcher = async (url: string) => getRequest(url);

export { getRequest, postRequest, putRequest, deleteRequest, fetcher, patchRequest };
