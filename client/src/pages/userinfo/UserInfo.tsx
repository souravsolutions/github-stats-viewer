import { useParams } from "react-router-dom";
import { userInfo } from "./hooks/userinfo";
import BasicInfo from "./BasicInfo";
import Navbar from "./Navbar";
import BestRepository from "./BestRepository";
import Languages from "./Languages";
import ContributionGraph from "./ContributionGraph";
import WeeklyGraph from "./WeeklyGraph";
import CornerRibbon from "./CornerRibbon";

const UserInfo = () => {
  const { username } = useParams();
  const finalUsername = username?.trim() ?? "";

  const { data, isLoading, isError } = userInfo(finalUsername);

  if (isError) {
    return (
      <div className='min-h-screen w-full bg-[#18181b] text-zinc-100 relative overflow-hidden'>
        <Navbar />
        <main className='relative z-10 mx-auto w-full max-w-6xl px-4 py-10 sm:py-16'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            User Not Found
          </h1>
        </main>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='min-h-screen w-full bg-[#18181b] text-zinc-100 relative overflow-hidden'>
        <main className='relative z-10 mx-auto w-full max-w-6xl px-4 py-10 sm:py-16'>
          <h1 className='text-2xl font-semibold tracking-tight'>Loading...</h1>
        </main>
      </div>
    );
  }

  return (
    <div className='min-h-screen w-full bg-[#18181b] text-zinc-100 relative overflow-hidden flex flex-col'>
      <CornerRibbon href={data?.user?.url ?? "#"} />
      <div
        className='absolute inset-0 opacity-30'
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.10) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(circle at center, black 0%, black 55%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 0%, black 55%, transparent 78%)",
        }}
      />
      <Navbar />
      <main className='relative z-10 w-full px-4 pb-10 sm:pb-16'>
        <div className='py-4'>
          <BasicInfo data={data} isLoading={isLoading} />
          <BestRepository data={data} isLoading={isLoading} />
          <Languages data={data} isLoading={isLoading} />
          <ContributionGraph data={data} isLoading={isLoading} />
          <WeeklyGraph data={data} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default UserInfo;
