import { Card } from "@/components/ui/card";

const SmallStats = ({ data }: any) => {
  return (
    <div className='mx-auto w-full max-w-380 my-9'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='bg-[#18181b]/60 border-white/10 backdrop-blur md:col-span-2 lg:col-span-1'>
          hi
        </Card>
        <Card className='bg-[#18181b]/60 border-white/10 backdrop-blur md:col-span-2 lg:col-span-1'>
          hi
        </Card>
        <Card className='bg-[#18181b]/60 border-white/10 backdrop-blur md:col-span-2 lg:col-span-1'>
          hi
        </Card>
        <Card className='bg-[#18181b]/60 border-white/10 backdrop-blur md:col-span-2 lg:col-span-1'>
          hi
        </Card>
      </div>
    </div>
  );
};

export default SmallStats;
