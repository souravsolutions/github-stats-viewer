import AppSidebar from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import NavBar from "../components/navbar";

const MainPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar collapsible='dock' />
      <SidebarInset className='flex h-screen flex-col overflow-hidden'>
        <NavBar />
        <main className='flex-1 overflow-auto p-4 lg:p-6'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainPage;
