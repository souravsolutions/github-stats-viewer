import { cn } from "@/lib/utils";

type WordHighlightProps = {
  children: React.ReactNode;
  className?: string;
};

export const WordHighlight = ({ children, className }: WordHighlightProps) => {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center px-5 py-1.5 align-middle",
        className,
      )}
    >
      <span className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,254,124,0.25),rgba(234,254,124,0.1)_45%,transparent_85%)] blur-2xl' />
      <span className='pointer-events-none absolute inset-0 border border-[#eafe7c]/50 bg-linear-to-r from-[#eafe7c]/10 via-[#eafe7c]/5 to-transparent' />

      <span className='pointer-events-none absolute -top-1 -left-1 size-1.5 bg-white' />
      <span className='pointer-events-none absolute -top-1 -right-1 size-1.5 bg-white' />
      <span className='pointer-events-none absolute -bottom-1 -left-1 size-1.5 bg-white' />
      <span className='pointer-events-none absolute -bottom-1 -right-1 size-1.5 bg-white' />

      <span className='relative z-10'>{children}</span>
    </span>
  );
};
