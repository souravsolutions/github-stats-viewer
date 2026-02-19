import api from "../axiosinstance";
import type { GithubRepo, GithubUser } from "./github-types";

const githubUser = async (username: string): Promise<GithubUser> => {
  const { data } = await api.get(`/users/${username}`);

  return data;
};

const githubRepos = async (username: string): Promise<GithubRepo[]> => {
  let page = 1;
  let allRepos: GithubRepo[] = [];

  while (true) {
    const { data } = await api.get(
      `/users/${username}/repos?per_page=100&page=${page}`,
    );

    allRepos = [...allRepos, ...data];

    if (data.length < 100) break;
    page++;
  }

  return allRepos;
};

export default githubRepos;

export { githubUser, githubRepos };
