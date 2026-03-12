import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../axios/requests/auth";
import { useStore } from "../store/storeProvider";
import { userKeys } from "./keys";

export const useUser = () => {
  const { userStore } = useStore();

  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: async () => {
      try {
        const user = await getCurrentUser();
        userStore.setUser(user);
        return user;
      } catch (error) {
        userStore.clearUser();
        throw error;
      }
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: false,
  });
};
