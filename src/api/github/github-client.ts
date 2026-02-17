import api from "../axiosinstance";
import type { GithubUser } from "./github-types";

const githubUser = async (username: string): Promise<GithubUser> => {
  const { data } = await api.get(`/users/${username}`);

  return data;
};

export default githubUser;
