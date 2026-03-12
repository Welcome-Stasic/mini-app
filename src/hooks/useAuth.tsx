import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../axios";
import { userKeys } from "./keys";

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.auth.signIn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: userKeys.profile() });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
