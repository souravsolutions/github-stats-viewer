import { fetchGithub } from "@/api/githubApi";
import { useQuery } from "@tanstack/react-query";

export function userInfo(username: string) {
  return useQuery({
    queryKey: ["userInfo", username],

    enabled: Boolean(username),

    queryFn: () => fetchGithub(username),

    staleTime: Infinity,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    gcTime: 10 * 60_000,

    retry: 1,
  });
}
