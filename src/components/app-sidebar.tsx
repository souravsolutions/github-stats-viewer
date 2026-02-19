import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
  HomeIcon,
  LifebuoyIcon,
  ShieldCheckIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { useLocation } from "react-router";
import { Avatar } from "@/components/ui/avatar";
import { Link } from "@/components/ui/link";
import {
  Menu,
  MenuContent,
  MenuHeader,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarRail,
  SidebarSection,
  SidebarSectionGroup,
} from "@/components/ui/sidebar";

export default function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>,
) {
  const location = useLocation();

  return (
    <Sidebar {...props}>
      <SidebarHeader className='bg-[#E3DDCF]! dark:bg-[#101010]! text-[#2E2E2E] dark:text-[#D1CFC0] dark:border-[#2A2A2A]'>
        <Link href='/' className='flex items-center gap-x-2'>
          <Avatar
            isSquare
            size='sm'
            className='outline-hidden'
            src='https://design.intentui.com/logo'
          />
          <SidebarLabel className='font-medium'>
            Github <span className='text-muted-fg'>Stats</span>
          </SidebarLabel>
        </Link>
      </SidebarHeader>
      <SidebarContent className='bg-[#E3DDCF]! dark:bg-[#101010]! text-[#2E2E2E] dark:text-[#D1CFC0] dark:border-[#2A2A2A]'>
        <SidebarSectionGroup>
          <SidebarSection>
            <SidebarItem
              tooltip='Home'
              href='/'
              isCurrent={location.pathname === "/"}
            >
              <HomeIcon />
              <SidebarLabel>Home</SidebarLabel>
            </SidebarItem>
            <SidebarItem
              tooltip='Repositories'
              href='/repos'
              isCurrent={location.pathname === "/repos"}
            >
              <RectangleStackIcon />
              <SidebarLabel>Repositories</SidebarLabel>
            </SidebarItem>
          </SidebarSection>
        </SidebarSectionGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
