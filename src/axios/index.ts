import { signIn, getCurrentUser, signOut, updateUser } from "./requests/auth";

export const API = {
  auth: {
    signIn,
    getCurrentUser,
    signOut,
    updateUser,
  },
};
