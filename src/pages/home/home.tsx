// import { userData } from "./hooks/get-user";
import UserInfo from "../components/user-info";

export const DUMMY_GITHUB_USER = {
  login: "souravsolutions",
  name: "Sourav",
  avatar_url: "https://avatars.githubusercontent.com/u/207404560?v=4",
  bio: null,
  location: "Kolkata",
  blog: "",
  company: null,
  html_url: "https://github.com/souravsolutions",

  followers: 12,
  following: 14,
  public_repos: 9,
  public_gists: 0,

  created_at: "2025-04-13T06:00:35Z",
};

const Home = () => {
  // const { data, isLoading, error } = userData("souravsolutions");
  console.log("hi");

  return (
    <div className='flex'>
      <UserInfo />
      <div>HI</div>
    </div>
  );
};

export default Home;
