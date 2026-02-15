import api from "../axiosinstance";

const githubUser = async (username: string) => {
  const { data } = await api.get(`/users/${username}`);

  return data;
};

export default githubUser;
