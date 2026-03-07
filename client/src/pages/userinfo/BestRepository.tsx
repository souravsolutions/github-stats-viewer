import { ExternalLink, Star } from "lucide-react";

const BestRepository = ({ data }: any) => {
  return (
    <div className='mx-auto w-full max-w-380 rounded-lg border border-white/10 p-4 sm:p-6 backdrop-blur my-9 flex justify-between items-center'>
      <div className='flex flex-col gap-4'>
        <h1>Top Repository</h1>
        <div className='flex gap-5 items-center justify-center'>
          <p>{data?.topRepository?.name}</p>
          <a href={data?.topRepository?.url} target='_blank'>
            <ExternalLink size={15} opacity={0.5} />
          </a>
        </div>
      </div>
      <div className='flex gap-2'>
        <Star size={20} color='yellow' />
        <p>{data?.topRepository?.stargazerCount}</p>
      </div>
    </div>
  );
};

export default BestRepository;
