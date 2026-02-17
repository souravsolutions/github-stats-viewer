import { SidebarNav, SidebarTrigger } from "@/components/ui/sidebar";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

export default function AppSidebarNav() {
  return (
    <SidebarNav>
      <span className='flex items-center gap-x-4'>
        <SidebarTrigger className='-ml-2.5 lg:ml-0' />
        <AnimatedThemeToggler />
      </span>
    </SidebarNav>
  );
}
