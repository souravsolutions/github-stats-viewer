import { api } from "./api";
import type { githubResponse } from "./githubResponse";

export const fetchGithub = async (
  username: string,
): Promise<githubResponse> => {
  const { data } = await api.post<githubResponse>("/github", { username });
  return data;
};
