import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../axios";
import { userKeys } from "./keys";
import { useStore } from "../store/storeProvider";

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const { userStore } = useStore();

  return useMutation({
    mutationFn: API.auth.signOut,
    onSuccess: async () => {
      userStore.clearUser();
      await queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      queryClient.removeQueries({ queryKey: userKeys.profile() });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
