import { apiClient } from "../axios";
import {
  CHANGE_AVATAR,
  GET_AVATAR,
  GET_USER,
  SIGN_IN,
  SIGN_OUT,
  UPDATE_ACCOUNT,
} from "../endpoints";
import type { IUpdateUser, UserProfile } from "../../types/user";
import type { ISignIn } from "../types/user";

////////// Взаимодействие по информации о пользователе //////////

// Вход
export const signIn = async (credentials: ISignIn): Promise<void> => {
  await apiClient.post(SIGN_IN, credentials);
};
// Получить текущего опльзователя
export const getCurrentUser = async (): Promise<UserProfile> => {
  const response = await apiClient.get(GET_USER);
  return response.data;
};
// Выход
export const signOut = async (): Promise<void> => {
  await apiClient.get(SIGN_OUT);
};
// Обновление пользователя
export const updateUser = async (userData: IUpdateUser): Promise<UserProfile> => {
  const response = await apiClient.put(UPDATE_ACCOUNT, userData);
  return response.data;
};
// Обнолвение аватарки
export const changeAvatar = async (avatar: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", avatar, avatar.name);
    const response = await apiClient.put<string>(CHANGE_AVATAR, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch {
    throw new Error("Не удалось обновить аватар");
  }
};
// Получение аватарки
export const getAvatar = async (): Promise<Blob> => {
  const response = await apiClient.get(GET_AVATAR, { responseType: "blob" });
  return response.data;
};