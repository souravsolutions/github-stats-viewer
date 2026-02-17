import AppSidebar from "@/components/app-sidebar";
import AppSidebarNav from "@/components/app-sidebar-nav";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const MainPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar collapsible='dock' />
      <SidebarInset>
        <AppSidebarNav />
        <div className='p-4 lg:p-6'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainPage;
