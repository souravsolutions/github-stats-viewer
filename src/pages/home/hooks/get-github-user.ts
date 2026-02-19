import { githubRepos, githubUser } from "@/api/github/github-client";
import { useQuery } from "@tanstack/react-query";

export const useUserData = (user: string) =>
  useQuery({
    queryKey: ["user", user],

    queryFn: () => githubUser(user),

    enabled: !!user,

    staleTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,

    gcTime: 1000 * 60 * 10,

    retry: 1,
  });

export const userUserRepos = (user: string) =>
  useQuery({
    queryKey: ["repos", user],

    queryFn: () => githubRepos(user),

    enabled: !!user,

    staleTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,

    gcTime: 1000 * 60 * 10,

    retry: 1,
  });
