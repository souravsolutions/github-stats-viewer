import { useParams } from "react-router-dom";
import { userInfo } from "./hooks/userinfo";
import BasicInfo from "./BasicInfo";
import Navbar from "./Navbar";
import BestRepository from "./BestRepository";
import Languages from "./Languages";
import ContributionGraph from "./ContributionGraph";
import WeeklyGraph from "./WeeklyGraph";
import CornerRibbon from "./CornerRibbon";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
      <div className='min-h-screen w-full bg-[#18181b] text-zinc-100 relative overflow-hidden flex flex-col'>
        <div className='flex-1 flex flex-col items-center justify-center px-4 py-10'>
          <div
            className='w-full max-w-[260px] sm:max-w-[320px] md:max-w-[360px]'
            role='status'
            aria-live='polite'
            aria-label='Loading'
          >
            <DotLottieReact
              src='https://lottie.host/c9fe1485-a771-4311-8988-d75141a28651/VNw81E9P8o.lottie'
              loop
              autoplay
            />
          </div>
          <p className='mt-2 flex items-center gap-3 text-[11px] sm:text-sm text-[#eafe7c] tracking-[0.32em] text-ubuntu font-semibold uppercase drop-shadow-[0_10px_26px_rgba(234,254,124,0.28)]'>
            <span>Building</span>
            <span className='flex items-center gap-1' aria-hidden='true'>
              <span className='h-1.5 w-1.5 rounded-full bg-[#eafe7c] shadow-[0_0_16px_rgba(234,254,124,0.55)] animate-bounce [animation-delay:-0.2s]' />
              <span className='h-1.5 w-1.5 rounded-full bg-[#eafe7c] shadow-[0_0_16px_rgba(234,254,124,0.55)] animate-bounce [animation-delay:-0.1s]' />
              <span className='h-1.5 w-1.5 rounded-full bg-[#eafe7c] shadow-[0_0_16px_rgba(234,254,124,0.55)] animate-bounce' />
            </span>
          </p>
        </div>
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
