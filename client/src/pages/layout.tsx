import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Github, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomeLayout = () => {
  const [username, setUsername] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username) {
      alert("Please enter a username");
      return;
    }

    navigate(`/${username}`);
  };

  const applyQuickPick = (value: string) => {
    setUsername(value);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <div className='min-h-screen w-full bg-[#18181b] text-zinc-100 relative overflow-hidden'>
      <div className='pointer-events-none absolute -top-40 -left-40 h-130 w-130 rounded-full bg-[#eafe7c]/1 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-48 -right-48 h-155 w-155 rounded-full bg-emerald-400/2 blur-3xl' />

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

      <main className='relative z-10 mx-auto flex min-h-svh w-full max-w-6xl flex-col px-4 py-10 sm:py-16'>
        <header className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
          <div className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur'>
            <Github className='h-4 w-4 text-[#eafe7c]' />
            <span className='text-sm text-zinc-200'>GitHub Stats</span>
            <span className='ml-1 rounded-full bg-[#eafe7c]/15 px-2 py-0.5 text-xs text-[#eafe7c]'>
              beta
            </span>
          </div>
          <div className='hidden sm:flex items-center gap-2 text-xs text-zinc-400'>
            <span>Fast profile snapshots</span>
          </div>
        </header>

        <section className='flex flex-1 items-center justify-center py-10 sm:py-14'>
          <div className='w-full max-w-2xl text-center'>
            <h1 className='text-balance text-4xl font-semibold tracking-tight sm:text-5xl'>
              Your GitHub, in a clean glance.
            </h1>
            <p className='mx-auto mt-4 max-w-xl text-pretty text-sm leading-6 text-gray-200 sm:text-base'>
              Search any username and get a sharp summary: repos, stars, top
              languages, and activity.
            </p>

            <div className='mt-7'>
              <div className='group relative'>
                <div className='pointer-events-none absolute -inset-0.5 rounded-2xl bg-linear-to-r from-[#eafe7c]/10 via-emerald-200/10 to-transparent opacity-70 blur transition group-focus-within:opacity-100' />
                <div className='relative rounded-2xl border border-white/10 bg-black/20 p-2 backdrop-blur'>
                  <form className='flex w-full gap-0' onSubmit={handleSubmit}>
                    <div className='relative w-full'>
                      <Github className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400' />
                      <Input
                        ref={inputRef}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Github Username'
                        type='text'
                        autoCapitalize='none'
                        autoCorrect='off'
                        spellCheck={false}
                        className='h-12 w-full rounded-xl rounded-r-none border-white/10 bg-[#141414]/80 pl-11 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-[#eafe7c]/40'
                      />
                    </div>
                    <Button
                      type='submit'
                      variant='outline'
                      className='h-12 w-auto shrink-0 rounded-xl rounded-l-none border-[#eafe7c] bg-[#eafe7c] px-8 text-black hover:bg-[#eafe7c]/90'
                    >
                      <Search className='h-5 w-5' />
                    </Button>
                  </form>
                </div>
              </div>

              <div className='mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-400'>
                <span className='rounded-full border border-white/10 bg-white/5 px-3 py-1.5'>
                  Try:
                </span>
                <button
                  type='button'
                  onClick={() => applyQuickPick("torvalds")}
                  className='rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition hover:border-white/20 hover:bg-white/10 cursor-pointer'
                >
                  Linus Torvalds
                </button>
                <button
                  type='button'
                  onClick={() => applyQuickPick("gaearon")}
                  className='rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition hover:border-white/20 hover:bg-white/10 cursor-pointer'
                >
                  dan
                </button>
                <button
                  type='button'
                  onClick={() => applyQuickPick("souravsolutions")}
                  className='rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition hover:border-white/20 hover:bg-white/10 cursor-pointer'
                >
                  苏 Sourav
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className='pt-4 text-center text-xs text-zinc-500'>
          Built by{" "}
          <a
            href='https://github.com/souravsolutions'
            className='text-zinc-300 underline decoration-white/15 underline-offset-4 transition hover:text-white hover:decoration-white/30'
          >
            苏 Sourav
          </a>
          . No sign-in.
        </footer>
      </main>
    </div>
  );
};

export default HomeLayout;
