import { signIn, getCurrentUser, signOut } from "./requests/auth";

export const API = {
  auth: {
    signIn,
    getCurrentUser,
    signOut,
  },
};
