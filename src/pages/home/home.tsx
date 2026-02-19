import UserDetails from "./components/user-details-cards";
import UserGraphs from "./components/user-graphs";
import { userUserRepos, useUserData } from "./hooks/get-github-user";

// export const DUMMY_GITHUB_USER = {
//   login: "souravsolutions",
//   name: "Sourav",
//   avatar_url: "https://avatars.githubusercontent.com/u/207404560?v=4",
//   bio: null,
//   location: "Kolkata",
//   blog: "",
//   company: null,
//   html_url: "https://github.com/souravsolutions",

//   followers: 12,
//   following: 14,
//   public_repos: 9,
//   public_gists: 0,

//   created_at: "2025-04-13T06:00:35Z",
// };

const Home = () => {
  const username = "Avijit07x";

  const { data: user } = useUserData(username);
  const { data: repos } = userUserRepos(username);

  return (
    <div className='flex h-full w-full gap-6 overflow-hidden'>
      <div className='w-[75%] min-w-75 h-full overflow-hidden'>
        <UserDetails user={user} repos={repos} />
      </div>
      <div className='w-[25%] h-full overflow-hidden'>
        <UserGraphs />
      </div>
    </div>
  );
};

export default Home;
