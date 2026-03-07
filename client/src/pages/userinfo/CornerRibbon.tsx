import { Github } from "lucide-react";

type CornerRibbonProps = {
  href: string;
};

const CornerRibbon = ({ href }: CornerRibbonProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Open GitHub profile"
      className="group absolute right-0 top-0 z-30 block h-20 w-20 overflow-hidden"
    >
      <div className="absolute -right-10 top-2.5 flex w-30 rotate-45 items-center justify-center bg-blue-600 py-2 shadow-lg transition-all duration-300 ease-out group-hover:-right-9 group-hover:scale-105">
        <Github className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110" />
      </div>
    </a>
  );
};

export default CornerRibbon;