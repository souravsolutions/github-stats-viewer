import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className='w-full bg-[#18181b]'>
      <div className='mx-auto flex h-12 w-full max-w-398 items-center justify-between px-4 py-5 sm:px-10'>
        <h1 className='text-base sm:text-lg font-semibold tracking-tight text-zinc-100'>
          User Info
        </h1>

        <button
          type='button'
          onClick={() => navigate("/")}
          className='text-lg flex gap-1 items-center justify-center hover:underline hover:decoration-1 underline-offset-2 cursor-pointer'
        >
          <ChevronLeft size={15} /> Home
        </button>
      </div>
    </header>
  );
};

export default Navbar;
