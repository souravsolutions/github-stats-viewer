import { BookMarked, UserCheck, Users } from "lucide-react";

const BasicInfo = ({ data }: any) => {
  return (
    <section className='mx-auto w-full max-w-380 rounded-lg border border-white/10 p-4 sm:p-6 backdrop-blur'>
      <div className='flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6'>
        <img
          src={data?.user.avatarUrl}
          alt={data?.user?.name ?? "GitHub user"}
          className='h-25 w-25 sm:h-29 sm:w-29 rounded-full object-cover border border-white/10 shrink-0'
        />

        <div className='flex flex-col justify-center gap-2 text-center sm:text-left'>
          <h1 className='text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-100 wrap-break-word'>
            {data?.user?.name}
          </h1>

          <div className='flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 text-lg sm:text-sm text-zinc-400'>
            <span className='flex items-center gap-2'>
              <Users className='h-4 w-4 text-zinc-500' />
              {data?.user?.followers} Followers
            </span>

            <span className='flex items-center gap-2'>
              <UserCheck className='h-4 w-4 text-zinc-500' />
              {data?.user?.following} Following
            </span>

            <span className='flex items-center gap-2'>
              <BookMarked className='h-4 w-4 text-zinc-500' />
              {data?.user?.totalRepositories} Repos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicInfo;
