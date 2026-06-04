import axios from "axios";
import type { AxiosResponse } from "axios";
import type { AxiosError } from "axios";
import type { IApiResponse } from "./types/base";

export const apiClient = axios.create({
  baseURL: `/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Пропускаем обработку для Blob (картинки)
    if (response.data instanceof Blob) {
      return response;
    }

    const apiResponse = response.data as IApiResponse<unknown>;
    if (
      apiResponse &&
      typeof apiResponse === "object" &&
      "success" in apiResponse
    ) {
      if (apiResponse.success) {
        response.data = apiResponse.data;
        return response;
      } else {
        return Promise.reject(apiResponse);
      }
    }
    return response;
  },
  (error: AxiosError) => {
    // Не выбрасываем 404 для запросов картинок
    if (error.response?.status === 404 && error.config?.url?.includes('get-image')) {
      return Promise.resolve(error.response as AxiosResponse);
    }
    
    if (error.response?.data) {
      const apiResponse = error.response.data as IApiResponse<unknown>;
      if (apiResponse && typeof apiResponse === "object" && "success" in apiResponse) {
        return Promise.reject(apiResponse);
      }
    }
    return Promise.reject({
      success: false,
      message: error.message || "Ошибка соединения",
      data: null,
    });
  },
);

export default apiClient;
