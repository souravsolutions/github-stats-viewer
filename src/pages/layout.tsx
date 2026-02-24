import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HomeLayout = () => {
  return (
    <div className='min-h-screen w-full bg-[#141414] relative flex justify-center items-center'>
      <div
        className='absolute inset-0 opacity-30'
        style={{
          backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />
      <div className='w-full max-w-xl px-4 relative z-10'>
        <div className='flex w-full flex-col gap-2 sm:flex-row sm:gap-0'>
          <Input
            placeholder='Github Username'
            type='text'
            className='h-14 text-white sm:rounded-r-none'
          />
          <Button
            variant='outline'
            className='h-14 w-full cursor-pointer bg-[#D1CFC0] sm:w-auto sm:rounded-l-none'
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
