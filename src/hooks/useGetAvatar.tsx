import { useQuery } from "@tanstack/react-query";
import { getAvatar } from "../axios/requests/auth";
import { avatarKeys } from "./keys";

export const useGetAvatar = () => {
  return useQuery({
    queryKey: avatarKeys.detail(),
    queryFn: getAvatar,
    staleTime: 300000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: false,
  });
};
