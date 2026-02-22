import SmallGraphs from "./components/SmallGraphs";
import UserDetails from "./components/user-details-cards";
import UserGraphs from "./components/user-graphs";
import {
  useGithubGraph,
  userUserRepos,
  useUserData,
} from "./hooks/get-github-user";

const Home = () => {
  const username = "souravsolutions";

  const { data: user } = useUserData(username);
  const { data: repos } = userUserRepos(username);
  const { data: graph } = useGithubGraph(username);

  return (
    <div className='grid grid-cols-1 2xl:grid-cols-[3fr_1fr] gap-6 h-full w-full'>
      <div className='flex flex-col gap-6 min-w-0'>
        <UserDetails user={user} repos={repos} />
        <UserGraphs graph={graph} username={username} />
      </div>

      <div className='w-full'>
        <SmallGraphs />
      </div>
    </div>
  );
};

export default Home;
