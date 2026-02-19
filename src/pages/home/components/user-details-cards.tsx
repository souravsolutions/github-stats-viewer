import type { GithubRepo, GithubUser } from "@/api/github/github-types";
import { useEffect, useMemo } from "react";

type Props = {
  user: GithubUser | undefined;
  repos: GithubRepo[] | undefined;
};

const UserDetails = ({ user, repos }: Props) => {
  const languageStats = useMemo(() => {
    if (!repos) return [];

    const counts: Record<string, number> = {};

    repos.forEach((repo) => {
      if (!repo.language) return;

      counts[repo.language] = (counts[repo.language] || 0) + 1;
    });

    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    return Object.entries(counts).map(([lang, count]) => ({
      name: lang,
      value: Number(((count / total) * 100).toFixed(2)),
    }));
  }, [repos]);

  useEffect(() => {
    console.log(languageStats);
  });

  return (
    <div className='flex gap-5'>
      <div className='flex flex-col items-center text-center p-8 w-90 h-115 rounded-3xl border shadow-lg'>
        <div className='p-1 rounded-full'>
          <img
            src='https://i.pinimg.com/736x/35/52/a8/3552a84505b17d071fac7097da40b7b9.jpg'
            alt='sourav'
            className='h-24 w-24 rounded-full object-cover'
          />
        </div>

        <div className='mt-5'>
          <h2 className='text-xl font-semibold'>Sourav</h2>
          <p className='text-sm'>@sourav</p>
        </div>

        <div className='flex gap-12 mt-6'>
          <div className='flex flex-col items-center'>
            <h3 className='text-lg font-semibold'>12.5k</h3>
            <p className='text-sm'>Followers</p>
          </div>

          <div className='flex flex-col items-center'>
            <h3 className='text-lg font-semibold'>150</h3>
            <p className='text-sm'>Repositories</p>
          </div>
        </div>

        <button className='mt-8 w-full py-3 rounded-full transition'>
          View profile
        </button>
      </div>

      <div className='flex flex-col gap-5 w-85'>
        {/* Card 1 */}
        <div className='rounded-2xl border shadow-sm p-5'>
          <p className='text-sm opacity-70'>Total Stars</p>
          <h2 className='text-3xl font-semibold leading-none mt-2'>3,045</h2>
          <p className='text-sm opacity-70 mt-2'>Total Stars</p>
        </div>

        {/* Card 2 */}
        <div className='rounded-2xl border shadow-sm p-5'>
          <p className='text-sm opacity-70'>Top Repo</p>
          <h2 className='text-3xl font-semibold leading-none mt-2'>Games</h2>
          <p className='text-sm opacity-70 mt-2'>Top Repo</p>
        </div>

        {/* Card 3 */}
        <div className='rounded-2xl border shadow-sm p-5'>
          <p className='text-sm opacity-70'>Total </p>
          <h2 className='text-3xl font-semibold leading-none mt-2'>102</h2>
          <p className='text-sm opacity-70 mt-2'>Pull Requests</p>
        </div>
      </div>

      <div className='flex flex-col p-6 h-110 w-95 bg-[#f4efe4] boarder rounded-2xl shadow-sm border border-[#CFC8B8] dark:border-[#2A2A2A] dark:bg-[#1c1c1c]'>
        language usage
      </div>
    </div>
  );
};

export default UserDetails;
