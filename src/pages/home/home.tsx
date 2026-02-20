import UserDetails from "./components/user-details-cards";
import UserGraphs from "./components/user-graphs";
import { userUserRepos, useUserData } from "./hooks/get-github-user";

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
