import UserDetails from "./components/user-details-cards";
import UserGraphs from "./components/user-graphs";
import { userUserRepos, useUserData } from "./hooks/get-github-user";

const Home = () => {
  const username = "Ayush01010101";

  const { data: user } = useUserData(username);
  const { data: repos } = userUserRepos(username);

  return (
    <div className='flex h-full w-full gap-6 overflow-hidden'>
      <div className='w-[75%] min-w-75 h-full overflow-hidden flex flex-col'>
        <UserDetails user={user} repos={repos} />
        <UserGraphs />
      </div>
      <div className='w-[25%] h-full overflow-hidden'>
      </div>
    </div>
  );
};

export default Home;
