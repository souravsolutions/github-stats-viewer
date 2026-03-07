import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  return (
    <header className="relative z-20 w-full bg-[#18181b]">
      <div className="mx-auto flex h-12 w-full max-w-398 items-center justify-between px-4 py-5 sm:px-10">
        <h1 className="text-base font-semibold tracking-tight text-zinc-100 sm:text-lg">
          User Info
        </h1>

        <button
          type="button"
          onClick={handleBack}
          className="mr-16 flex items-center justify-center gap-1 text-lg underline-offset-2 hover:underline hover:decoration-1 sm:mr-5"
        >
          <ChevronLeft size={15} />
          Back
        </button>
      </div>
    </header>
  );
};

export default Navbar;