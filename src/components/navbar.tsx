import AppSidebarNav from "@/components/app-sidebar-nav";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 flex h-13 w-full shrink-0 items-center justify-between border-b border-border/50 bg-bg/95 backdrop-blur px-4 md:px-6">
      <AppSidebarNav />
      <AnimatedThemeToggler />
    </header>
  );
};

export default NavBar;
