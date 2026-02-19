import { SidebarNav, SidebarTrigger } from "@/components/ui/sidebar";

export default function AppSidebarNav() {
  return (
    <SidebarNav>
      <span className='flex items-center gap-x-4'>
        <SidebarTrigger className='-ml-2.5 lg:ml-0' />
      </span>
    </SidebarNav>
  );
}
