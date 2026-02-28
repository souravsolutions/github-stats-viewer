const BasicInfo = ({ data }: any) => {
  return (
    <section className='mx-auto w-full rounded-xl border border-white/10 p-6 backdrop-blur'>
      <div className='flex items-center gap-6'>
        <img
          src={data?.user.avatarUrl}
          alt={data?.user?.name ?? "GitHub user"}
          className='h-24 w-24 rounded-full object-cover border border-white/10'
        />

        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl font-semibold tracking-tight text-zinc-100'>
            {data?.user?.name}
          </h1>

          <div className='flex items-center gap-6 text-sm text-zinc-400'>
            <span className='flex items-center gap-2'>
              {data?.user?.followers} Followers
            </span>

            <span className='flex items-center gap-2'>
              {data?.user?.following} Following
            </span>

            <span className='flex items-center gap-2'>
              {data?.user?.totalRepositories} Repos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicInfo;
