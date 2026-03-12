import { apiClient } from "../axios";
import { GET_USER, SIGN_IN, SIGN_OUT, UPDATE_ACCOUNT } from "../endpoints";
import type { IUpdateUser, UserProfile } from "../../types/user";
import type { ISignIn } from "../types/user";

export const signIn = async (credentials: ISignIn): Promise<void> => {
  await apiClient.post(SIGN_IN, credentials);
};

export const getCurrentUser = async (): Promise<UserProfile> => {
  const response = await apiClient.get(GET_USER);
  return response.data;
};

export const signOut = async (): Promise<void> => {
  await apiClient.get(SIGN_OUT);
};

export const updateUser = async (userData: IUpdateUser): Promise<any> => {
  const response = await apiClient.put(UPDATE_ACCOUNT, userData);
  return response.data;
};
