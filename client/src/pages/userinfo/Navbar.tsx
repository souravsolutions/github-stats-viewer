import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className='w-full bg-[#18181b] '>
      <div className='mx-auto flex h-12 w-full max-w-380 items-center justify-between px-4 py-2 sm:px-10'>
        <h1 className='text-base sm:text-lg font-semibold tracking-tight text-zinc-100'>
          User Info
        </h1>

        <button
          type='button'
          onClick={() => navigate("/")}
          className='rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 hover:bg-white/10 transition-colors'
        >
          Go Home
        </button>
      </div>
    </header>
  );
};

export default Navbar;
