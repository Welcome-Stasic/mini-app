import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../axios";
import { userKeys } from "./keys";
import { useStore } from "../store/storeProvider";
import type { UserProfile } from "../types/user";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { userStore } = useStore();

  return useMutation({
    mutationFn: API.auth.signIn,
    onSuccess: async () => {
      try {
        const user = await queryClient.fetchQuery<UserProfile>({
          queryKey: userKeys.profile(),
          queryFn: API.auth.getCurrentUser,
        });
        userStore.setUser(user);
      } catch (error) {
        console.error(error);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
