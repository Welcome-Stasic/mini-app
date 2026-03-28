import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../axios";
import { userKeys } from "../keys";
import { useStore } from "../../store/storeProvider";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { userStore } = useStore();

  return useMutation({
    mutationFn: API.auth.updateUser,
    onSuccess: (updatedUser) => {
      userStore.setUser(updatedUser);
      queryClient.setQueryData(userKeys.profile(), updatedUser);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
