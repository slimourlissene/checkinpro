"use client";

import {
  Building2,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
} from "lucide-react";

import { GeneralSidebar } from "./generalSidebar";
import { CheckInSidebar } from "./checkInSidebar";
import { LegalSidebar } from "./legalSidebar";
import { UserSidebar } from "./userSidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { User } from "next-auth";
import {
  computeSidebarCheckInItems,
  computeSidebarGeneralItems,
  computeSidebarLegalItems,
} from "@/utils/navigation";
import { ISidebarItem } from "@/types";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export default function AppSidebar({
  user,
  ...props
}: { user: User | undefined } & React.ComponentProps<typeof Sidebar>) {
  const navMainItems: ISidebarItem[] = computeSidebarGeneralItems({ user });
  const navCheckInItems: ISidebarItem[] = user
    ? computeSidebarCheckInItems()
    : [];
  const navLegalItems: ISidebarItem[] = computeSidebarLegalItems();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Building2 className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">L'USINE</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <GeneralSidebar items={navMainItems} />
        {user && <CheckInSidebar items={navCheckInItems} />}
        <LegalSidebar items={navLegalItems} />
      </SidebarContent>
      <SidebarFooter>{user && <UserSidebar user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
