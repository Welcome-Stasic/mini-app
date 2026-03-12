import { apiClient } from "../axios";
import { GET_USER, SIGN_IN, SIGN_OUT } from "../endpoints";
import type { UserProfile } from "../../types/user";

export interface ISignIn {
  email: string;
  password: string;
}

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
