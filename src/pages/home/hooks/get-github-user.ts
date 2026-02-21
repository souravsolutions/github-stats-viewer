import { githubContributions, githubRepos, githubUser } from "@/api/github/github-client";
import { useQuery } from "@tanstack/react-query";

export const useUserData = (user: string) =>
  useQuery({
    queryKey: ["user", user],

    queryFn: () => githubUser(user),

    enabled: !!user,

    staleTime: Infinity,

    refetchOnWindowFocus: false,

    refetchOnMount: false,

    gcTime: Infinity,

    retry: 1,
  });

export const userUserRepos = (user: string) =>
  useQuery({
    queryKey: ["repos", user],

    queryFn: () => githubRepos(user),

    enabled: !!user,

    staleTime: Infinity,

    refetchOnWindowFocus: false,

    refetchOnMount: false,

    gcTime: Infinity,

    retry: 1,
  });

  export const useGithubGraph = (username: string) =>
  useQuery({
    queryKey: ["github-graph", username],

    queryFn: () => githubContributions(username),

    enabled: !!username,

    staleTime: Infinity,
    gcTime: Infinity,

    refetchOnWindowFocus: false,
    refetchOnMount: false,

    retry: 1,
  });